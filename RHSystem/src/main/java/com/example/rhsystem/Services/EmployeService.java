package com.example.rhsystem.Services;

import com.example.rhsystem.Repository.EmployeRepo;
import com.example.rhsystem.dto.EmployeDTO;
import com.example.rhsystem.dto.FormationDTO;
import com.example.rhsystem.model.Employe;
import com.example.rhsystem.model.Formation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeService {
    @Autowired
    EmployeRepo empRepo;

    public Employe saveEmploye(Employe employe) {
        return empRepo.save(employe);
    }

    public List<Employe> getAllEmployees() {
        // Récupérer tous les employés depuis la base de données
        return empRepo.findAll();
    }

    public void deleteEmploye(int id) {
        Employe employe = empRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
        empRepo.delete(employe);
    }
    public Employe saveEmployee(Employe employe){
        System.out.println("Id: " + employe.getId());
        System.out.println("Nom: " + employe.getNom());
        System.out.println("Prenom: " + employe.getPrenom());
        System.out.println("Mail: " + employe.getMail());
        System.out.println("NumTelephone: " + employe.getNumTelephone());
        System.out.println("Poste: " + employe.getPoste());

        return empRepo.save(employe) ;
    }
    // Method to find an employee by ID
    public Optional<Employe> findEmployeById(int id) {
        return empRepo.findById(id); // Ensure id type matches the one in the repository
    }

    public List<Employe> findAllEmployees() {
        return empRepo.findAll();
    }
    public EmployeDTO convertToDto(Employe employe) {
        EmployeDTO dto = new EmployeDTO();
        dto.setMail(employe.getMail());
        dto.setNom(employe.getNom());
        dto.setId(employe.getId());
        dto.setNumTelephone(employe.getNumTelephone());
        dto.setCvPath(employe.getCvPath());
        dto.setAdresse(employe.getAdresse());
        dto.setDepartement(employe.getDepartement());
        dto.setContratDeTravailPath(employe.getContratDeTravailPath());
        dto.setPassword(employe.getPassword());
        dto.setPoste(employe.getPoste());
        dto.setDateofjoining(employe.getDateofjoining());
        dto.setDateDeNaissance(employe.getDateDeNaissance());
        dto.setNbHeures(employe.getNbHeures());
        dto.setMaladie(employe.getMaladie());
        dto.setNumUrgence(employe.getNumUrgence());
        dto.setPrenom(employe.getPrenom());
        dto.setBaseSalary(employe.getBaseSalary());
        dto.setHourlyRate(employe.getHourlyRate());

        return dto;
    }
    public List<EmployeDTO> searchEmployees(String name, String department) {
        if (name != null && department != null) {
            return empRepo.searchEmployees(name, department).stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        } else if (name != null) {
            return empRepo.findByNom(name).stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        } else if (department != null) {
            return empRepo.findByDepartement(department).stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        } else {
            return empRepo.findAll().stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        }
    }
    public Employe updateEmploye(int id, Employe employeDetails) {
        Employe employe = empRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employé introuvable avec l'ID : " + id));

        employe.setNom(employeDetails.getNom());
        employe.setPrenom(employeDetails.getPrenom());
        employe.setMail(employeDetails.getMail());
        employe.setPassword(employeDetails.getPassword());
        employe.setAdresse(employeDetails.getAdresse());
        employe.setNumTelephone(employeDetails.getNumTelephone());
        employe.setNumUrgence(employeDetails.getNumUrgence());
        employe.setDateDeNaissance(employeDetails.getDateDeNaissance());
        employe.setMaladie(employeDetails.getMaladie());
        employe.setDepartement(employeDetails.getDepartement());
        employe.setPoste(employeDetails.getPoste());
        employe.setDateofjoining(employeDetails.getDateofjoining());
        employe.setContratDeTravailPath(employeDetails.getContratDeTravailPath());
        employe.setCvPath(employeDetails.getCvPath());
        employe.setBaseSalary(employeDetails.getBaseSalary());
        employe.setHourlyRate(employeDetails.getHourlyRate());

        return empRepo.save(employe);
    }
    public Employe getEmployeeById(int id) {
        return empRepo.findById(id).orElse(null);
    }
    public Employe updateProfile(int id, Map<String, Object> updates) {
        Employe employee = empRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Employee not found"));

        // Dynamically update fields
        updates.forEach((key, value) -> {
            switch (key) {
                case "numTelephone":
                    employee.setNumTelephone(Long.parseLong(value.toString()));
                    break;
                case "adresse":
                    employee.setAdresse(value.toString());
                    break;
                case "maladie":
                    employee.setMaladie(value.toString());
                    break;
                case "numUrgence":
                    employee.setNumUrgence(Long.parseLong(value.toString()));
                    break;
                default:
                    throw new IllegalArgumentException("Field not updatable: " + key);
            }
        });

        return empRepo.save(employee);
    }
}
