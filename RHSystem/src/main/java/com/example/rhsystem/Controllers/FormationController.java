package com.example.rhsystem.Controllers;

import com.example.rhsystem.Repository.FormationRepo;
import com.example.rhsystem.Services.EmailService;
import com.example.rhsystem.Services.EmployeService;
import com.example.rhsystem.Services.FormationService;
import com.example.rhsystem.Services.UserDetailsImp;
import com.example.rhsystem.dto.EmployeDTO;
import com.example.rhsystem.dto.FormationDTO;
import com.example.rhsystem.model.Employe;
import com.example.rhsystem.model.Formation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/form")


public class FormationController {
    @Autowired
    FormationService formationService;
    @Autowired
    private FormationRepo formationRepository;
    @Autowired
    private EmployeService employeService;
    @Autowired
    private EmailService emailService;
    @GetMapping("/formations")
    public List<Formation> getAllFormations() {
        return formationService.getAllFormations();
    }
    //@PreAuthorize("hasRole('ROLE_RH')")


    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<?> createFormation(
            @RequestPart("formation") Formation formation,
            @RequestPart("photo") MultipartFile photo) {
        try {
            // Save the photo file, e.g., in the file system or a database
            String filePath = formationService.savePhotoFile(photo);
            formation.setPhotoPath(filePath); // Assuming `photoPath` is a field in Formation for the photo location

            List<Employe> employeList = new ArrayList<>();
            boolean allEmployeesFound = true;

            for (Employe employe : formation.getEmployes()) {
                Optional<Employe> foundEmploye = employeService.findEmployeById(employe.getId());
                if (foundEmploye.isPresent()) {
                    employeList.add(foundEmploye.get());
                } else {
                    allEmployeesFound = false;
                }
            }

            for (Employe employe : employeList) {
                employe.getFormationList().add(formation);
            }

            formation.setEmployes(employeList);
            Formation savedFormation = formationRepository.save(formation);

            if (allEmployeesFound) {
                return ResponseEntity.ok(savedFormation);
            } else {
                return ResponseEntity.status(206).body(savedFormation);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading photo: " + e.getMessage());
        }
    }
    //@PreAuthorize("hasRole('ROLE_RH')")


    @GetMapping("/employe")
    public ResponseEntity<List<Employe>> getAllEmployees() {
        List<Employe> employees = employeService.getAllEmployees();

        return ResponseEntity.ok(employees);
    }

    //@PreAuthorize("hasRole('ROLE_RH')")

    @GetMapping("/{id}")
    public ResponseEntity<Formation> getFormationById(@PathVariable int id) {
        Optional<Formation> formation = formationService.findFormationById(id);
        if (formation.isPresent()) {
            return ResponseEntity.ok(formation.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/edit/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> editFormation(
            @PathVariable int id,
            @RequestPart("formation") Formation updatedFormation,
            @RequestPart(value = "photo", required = false) MultipartFile photo) {
        try {
            // Fetch the existing formation
            Optional<Formation> existingFormationOpt = formationRepository.findById(id);
            if (existingFormationOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Formation not found");
            }

            Formation existingFormation = existingFormationOpt.get();

            // Update basic fields
            existingFormation.setTitre(updatedFormation.getTitre());
            existingFormation.setDescription(updatedFormation.getDescription());
            existingFormation.setFormateur(updatedFormation.getFormateur());
            existingFormation.setDateDebutF(updatedFormation.getDateDebutF());
            existingFormation.setDateFinF(updatedFormation.getDateFinF());
            existingFormation.setFormUrl(updatedFormation.getFormUrl());
            // Handle photo update if present
            if (photo != null && !photo.isEmpty()) {
                String newFilePath = formationService.savePhotoFile(photo);
                existingFormation.setPhotoPath(newFilePath);
            }

            // Update the employee list if new employees are provided
            if (updatedFormation.getEmployes() != null && !updatedFormation.getEmployes().isEmpty()) {
                List<Employe> updatedEmployeList = updatedFormation.getEmployes();



                // Remove employees who are no longer selected in the multi-select
                List<Employe> currentEmployees = new ArrayList<>(existingFormation.getEmployes());
                for (Employe currentEmploye : currentEmployees) {
                    if (!updatedEmployeList.contains(currentEmploye)) {
                        currentEmploye.getFormationList().remove(existingFormation); // Remove this formation from employee's list
                    }
                }

                // Add new employees to the formation if not already added
                for (Employe newEmploye : updatedEmployeList) {
                    if (!existingFormation.getEmployes().contains(newEmploye)) {
                        newEmploye.getFormationList().add(existingFormation); // Add formation to employee's list
                    }
                }

                // Clear the current employes list and add the updated list
                existingFormation.getEmployes().clear();
                existingFormation.getEmployes().addAll(updatedEmployeList);
            }

            // Save the updated formation
            Formation savedFormation = formationRepository.save(existingFormation);

            // Convert savedFormation to DTO and return it
            //FormationDTO dto = formationService.convertToDto(savedFormation);
            return ResponseEntity.ok(savedFormation);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating formation: " + e.getMessage());
        }
    }


    @GetMapping("/employees/{formationId}")
    public ResponseEntity<?> getEmployeesByFormationId(@PathVariable int formationId) {
        try {
            List<Employe> employees = formationService.getEmployeesByFormationId(formationId);
            return ResponseEntity.ok(employees);  // Return employees list
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }




    @GetMapping("/formation")
    public List<Formation> getFormationsByEmployee(Authentication authentication) {
        int id = ((UserDetailsImp) authentication.getPrincipal()).getId();
        return formationService.getFormationsByEmployeeId(id);
    }



    @GetMapping("/Response/{id}")
    public ResponseEntity<Formation> getFormationByIdResponse(@PathVariable int id) {
        Optional<Formation> formation = formationService.findFormationById(id);
        if (formation.isPresent()) {
            return ResponseEntity.ok(formation.get());
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/formations/{formationId}/{action}")
    public ResponseEntity<?> handleFormationResponse(
            @PathVariable int formationId,
            @PathVariable String action,
            Authentication authentication
    ) {
        try {
            int employeeId = ((UserDetailsImp) authentication.getPrincipal()).getId();
            Optional<Formation> formationOptional = formationService.findFormationById(formationId);

            if (formationOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Formation non trouvée");
            }

            Optional<Employe> employeeOptional = employeService.findEmployeById(employeeId);
            if (employeeOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee non trouvé");
            }

            if (!List.of("accepter", "refuser").contains(action.toLowerCase())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Action invalide. Utilisez 'accepter' ou 'refuser'.");
            }

            Formation formation = formationOptional.get();
            String response = action.equalsIgnoreCase("accepter") ? "acceptée" : "refusée";
            formation.getResponses().put(employeeId, response);

            formationService.saveFormation(formation);

            return ResponseEntity.ok("Formation " + response + " avec succées pour l employé " + employeeId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l ajout: " + e.getMessage());
        }
    }




    @Scheduled(cron = "0 37 17 * * ?")
    @Transactional
    public void sendFormationEndForms() {
        Date today = new Date();

        // Get formations ending today
        List<Formation> endingFormations = formationService.findFormationByDateF(today);

        for (Formation formation : endingFormations) {
            Optional<Formation> optionalFormation = Optional.ofNullable(formation); // Wrap in Optional

            optionalFormation.ifPresent(f -> { // Process only if present
                for (Employe employe : f.getEmployes()) {
                    String formPath = formation.getFormUrl();
                    String email = employe.getMail();
                    String subject = "Formation Ending Today - " + f.getTitre();
                    String message = String.format(
                            "Dear %s,\n\n the formation \"%s\" ends today.\n\nplease fill out this form and give us your feedback '%s'\n\nBest regards,\nYour HR Team",
                            employe.getNom(), f.getTitre(),formPath
                    );
                    emailService.sendEmail(email, subject, message);
                }
            });
        }
    }


}
