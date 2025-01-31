package com.example.rhsystem.Controllers;

import com.example.rhsystem.Services.OffreEmploiService;
import com.example.rhsystem.model.OffreEmploi;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offre-emploi")
@CrossOrigin(origins = "http://localhost:3000")
public class OffreEmploiController {
    @Autowired
    OffreEmploiService offreEmploiService;
    @PreAuthorize("hasRole('ROLE_RH')")
    @PostMapping("/create")
    public ResponseEntity<OffreEmploi> saveOffreEmploi(@RequestBody OffreEmploi offreEmploi) {
        OffreEmploi offreEmploiSave = offreEmploiService.CreateOffreEmploi(offreEmploi);
        return ResponseEntity.ok(offreEmploiSave);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    //@PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/consulterOffre")
    public ResponseEntity<List<OffreEmploi>> consulterOffre(Model model) {
        List<OffreEmploi> offreEmploiList = offreEmploiService.getAllOffreEmploi();
        model.addAttribute("offreEmploiList", offreEmploiList);

        return ResponseEntity.ok(offreEmploiList);
    }
    //@PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/consulterOffre/{id}")
    public ResponseEntity<OffreEmploi> getOffreById(@PathVariable int id) {
        OffreEmploi offreEmploi = offreEmploiService.getOffreEmploiById(id);
        if (offreEmploi != null) {
            return ResponseEntity.ok(offreEmploi);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}