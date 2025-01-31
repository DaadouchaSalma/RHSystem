package com.example.rhsystem.Controllers;

import com.example.rhsystem.Request.SignupRequest;
import com.example.rhsystem.Services.EmployeService;
import com.example.rhsystem.Controllers.AuthController;
import com.example.rhsystem.Services.UserDetailsImp;
import com.example.rhsystem.dto.EmployeDTO;
import com.example.rhsystem.dto.FormationDTO;
import com.example.rhsystem.model.Employe;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeController {

    @Autowired
    EmployeService empService;
    @Autowired
    AuthController authController;
    private final String uploadDirectory = "src/main/resources/static/uploads";
    /*@GetMapping
    public List<Employe> getAllEmployees() {
        return empService.getAllEmployees();
    }*/
    @PreAuthorize("hasRole('ROLE_RH')")
    @GetMapping
    public List<EmployeDTO> getAllEmployees(@RequestParam(required = false) String nom) {
        return empService.getAllEmployees().stream()
                .map(empService::convertToDto)
                .collect(Collectors.toList());
    }
    @PreAuthorize("hasRole('ROLE_RH')")
    @GetMapping("/search")
    public List<EmployeDTO> searchEmployees(@RequestParam(required = false) String name,
                                            @RequestParam(required = false) String department) {
        return empService.searchEmployees(name, department);
    }
    @PreAuthorize("hasRole('ROLE_RH')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable int id) {
        empService.deleteEmploye(id);
        return ResponseEntity.ok().build();
    }
    /*
    @PreAuthorize("hasRole('ROLE_RH')")
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Employe> ajouterEmploye(@RequestPart ("employe") String employe,
                                                  @RequestPart("cvPath") MultipartFile cvPath,
                                                  @RequestPart("img") MultipartFile imgPath,
                                                  @RequestPart("contratDeTravailPath") MultipartFile contratDeTravailPath){
        // Debugging logs
        System.out.println("Received Employee: " + employe);
        System.out.println("Received cvPath file: " + cvPath.getOriginalFilename());
        System.out.println("Received contratDeTravailPath file: " + contratDeTravailPath.getOriginalFilename());

        try {
            ObjectMapper mapper = new ObjectMapper();
            Employe employe1 = mapper.readValue(employe, Employe.class);
            // Sauvegarder les fichiers et obtenir les chemins
            String cvFileName = saveFile(cvPath);
            String imgFileName = saveFile(imgPath);
            String contratFileName = saveFile(contratDeTravailPath);

            // Mettre à jour les chemins dans l'employé
            employe1.setCvPath(cvFileName);
            employe1.setImg(imgFileName);
            employe1.setContratDeTravailPath(contratFileName);

            // Sauvegarder l'employé avec les chemins de fichiers
            Employe savedEmploye = empService.saveEmployee(employe1);

            return ResponseEntity.ok(savedEmploye);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }*/
    @PreAuthorize("hasRole('ROLE_RH')")
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> ajouterEmploye(
            @RequestPart("employe") String employe,
            @RequestPart("cvPath") MultipartFile cvPath,
            @RequestPart("img") MultipartFile imgPath,
            @RequestPart("contratDeTravailPath") MultipartFile contratDeTravailPath) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            SignupRequest signupRequest = mapper.readValue(employe, SignupRequest.class);

            // Save file paths
            String cvFileName = saveFile(cvPath);
            String imgFileName = saveFile(imgPath);
            String contratFileName = saveFile(contratDeTravailPath);

            signupRequest.setCvPath(cvFileName);
            signupRequest.setImg(imgFileName);
            System.out.println(imgFileName);
            signupRequest.setContratDeTravailPath(contratFileName);

            // Call the signup method
            ResponseEntity<?> response = authController.registerUser(signupRequest);

            if (!response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response.getBody());
            }

            return ResponseEntity.ok("Employee added successfully!");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving files: " + e.getMessage());
        }
    }
    public String saveFile(MultipartFile photo) throws IOException {
        if (photo.isEmpty()) {
            throw new IOException("File is empty");
        }


        // Generate a unique filename to avoid conflicts
        String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
        Path filePath = Paths.get(uploadDirectory, fileName);

        // Create directories if they do not exist
        Files.createDirectories(filePath.getParent());

        // Save the file to the specified path
        Files.write(filePath, photo.getBytes());

        // Return the relative path or URL where the file is stored
        // return filePath.toString();
        return fileName;
    }
    @PreAuthorize("hasRole('ROLE_EMPLOYE')")
    @GetMapping("/profileEmp")
    public ResponseEntity<Optional<Employe>> getEmployee(Authentication authentication) {

            // Get the user ID from the Authentication object
            int id = ((UserDetailsImp) authentication.getPrincipal()).getId();

            Optional<Employe> emp = empService.findEmployeById(id);
        System.out.println(emp);
            if (emp != null) {

                return ResponseEntity.ok(emp);
            } else {
                return ResponseEntity.notFound().build();
            }
    }
    @PreAuthorize("hasRole('ROLE_EMPLOYE')")
    @PutMapping("/updateProfile")
    public ResponseEntity<Employe> updateEmployeeProfile(
            @RequestBody Map<String, Object> updates ,Authentication authentication) {
        try {
            int id = ((UserDetailsImp) authentication.getPrincipal()).getId();
            Employe updatedEmployee = empService.updateProfile(id, updates);
            return ResponseEntity.ok(updatedEmployee);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }



    @PreAuthorize("hasRole('ROLE_RH')")
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<Employe> getEmployeeById(@PathVariable int id) {
        Employe employee = empService.getEmployeeById(id);
        if (employee != null) {
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PreAuthorize("hasRole('ROLE_RH')")
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> updateEmploye(
            @PathVariable int id,
            @RequestPart("employe") String employeDetails,
            @RequestPart(value = "cvPath", required = false) MultipartFile cvPath,
            @RequestPart(value = "contratDeTravailPath", required = false) MultipartFile contratDeTravailPath) {
        try {
            // Convertir les détails de l'employé reçus sous forme de chaîne JSON
            ObjectMapper mapper = new ObjectMapper();
            Employe employeToUpdate = mapper.readValue(employeDetails, Employe.class);

            // Sauvegarder les fichiers si fournis
            if (cvPath != null && !cvPath.isEmpty()) {
                String cvFileName = saveFile(cvPath);
                employeToUpdate.setCvPath(cvFileName);
            }
            if (contratDeTravailPath != null && !contratDeTravailPath.isEmpty()) {
                String contratFileName = saveFile(contratDeTravailPath);
                employeToUpdate.setContratDeTravailPath(contratFileName);
            }

            // Appeler le service pour mettre à jour l'employé
            Employe updatedEmploye = empService.updateEmploye(id, employeToUpdate);

            return ResponseEntity.ok(updatedEmploye);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la sauvegarde des fichiers : " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Erreur lors de la mise à jour : " + e.getMessage());
        }
    }


}
