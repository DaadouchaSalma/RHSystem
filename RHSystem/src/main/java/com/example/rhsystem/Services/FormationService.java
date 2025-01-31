package com.example.rhsystem.Services;

import com.example.rhsystem.Repository.FormationRepo;
import com.example.rhsystem.dto.EmployeDTO;
import com.example.rhsystem.model.Employe;

import com.example.rhsystem.dto.FormationDTO;
import com.example.rhsystem.model.Formation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FormationService {
    @Autowired
    FormationRepo formationRepo;
    public List<Formation> getAllFormations() {
        return formationRepo.findAll();
    }

    private final String uploadDirectory = "src/main/resources/static/photoFormateur"; // Specify the path for storing photos

    public Optional<Formation> findFormationById(int id) {
        return formationRepo.findById(id); // Ensure id type matches the one in the repository
    }
    public List<Formation> findAllFormations() {
        return formationRepo.findAll();
    }

    public Formation saveFormation(Formation formation) {
        // Save the formation object to the database
        return formationRepo.save(formation);
    }


    public String savePhotoFile(MultipartFile photo) throws IOException {
        if (photo.isEmpty()) {
            throw new IOException("File is empty");
        }

        // Validate the content type to ensure it's an image
        String contentType = photo.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IOException("Invalid file type. Only image files are allowed.");
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

    public FormationDTO convertToDto(Formation formation) {
        FormationDTO dto = new FormationDTO();
        dto.setIdF(formation.getIdF());
        dto.setTitre(formation.getTitre());
        dto.setDescription(formation.getDescription());
        dto.setFormateur(formation.getFormateur());
        dto.setPhotoPath(formation.getPhotoPath());
        dto.setDateDebutF(formation.getDateDebutF());
        dto.setDateFinF(formation.getDateFinF());
        dto.setFormUrl(formation.getFormUrl());
        List<EmployeDTO> employeeDTOs = formation.getEmployes().stream()
                .map(emp -> new EmployeDTO(emp.getId(), emp.getNom(), emp.getPrenom(), emp.getMail()))
                .collect(Collectors.toList());
        dto.setEmployees(employeeDTOs);
        dto.setResponses(formation.getResponses());

        return dto;
    }
    public List<Formation> getFormationsByEmployeeId(int employeeId) {
        return formationRepo.findByEmployesId(employeeId);
    }


    public List<Formation> findFormationByDateF(Date dateF) {
        return formationRepo.findByDateFinF(dateF);
    }

    public List<Employe> getEmployeesByFormationId(int formationId) {
        Optional<Formation> formationOpt = formationRepo.findById(formationId);

        Formation formation = formationOpt.get();
        return formation.getEmployes();  // Assuming `getEmployes()` is the list of employees for the formation
    }
}
