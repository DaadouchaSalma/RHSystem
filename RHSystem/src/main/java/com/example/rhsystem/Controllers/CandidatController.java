package com.example.rhsystem.Controllers;

import com.example.rhsystem.Services.CandidatService;
import com.example.rhsystem.model.Candidat;
import com.example.rhsystem.model.OffreEmploi;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/candidat")
public class CandidatController {
    @Autowired
    CandidatService candidatService;
    private final String uploadDirectory = "src/main/resources/static/uploads";

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Candidat> ajouterCandidat(@RequestPart("candidat") String candidat,
                                                   @RequestParam("idOffre") int idOffre,
                                                   @RequestPart("cvPath") MultipartFile cvPath) {
        // Debugging logs
        System.out.println("Received Employee: " + candidat);
        System.out.println("Received cvPath file: " + cvPath.getOriginalFilename());

        try {
            ObjectMapper mapper = new ObjectMapper();
            Candidat candidat1 = mapper.readValue(candidat, Candidat.class);
            // Sauvegarder les fichiers et obtenir les chemins
            String cvFileName = saveFile(cvPath);

            // Mettre à jour les chemins dans l'employé
            candidat1.setCvPath(cvFileName);

            // Sauvegarder l'employé avec les chemins de fichiers
            Candidat savedCandidat = candidatService.saveCandidat(candidat1, idOffre);

            return ResponseEntity.ok(savedCandidat);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
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

    @PreAuthorize("hasRole('ROLE_RH')")
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllCandidatsWithOffres() {
        List<Candidat> candidats = candidatService.getAllCandidats();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Candidat candidat : candidats) {
            for (OffreEmploi offre : candidat.getOffreEmploiList()) {
                Map<String, Object> row = new HashMap<>();
                row.put("candidat", candidat);
                row.put("offreTitre", offre.getTitre());
                result.add(row);
            }
        }

        return ResponseEntity.ok(result);
    }
}
