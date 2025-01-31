package com.example.rhsystem.Controllers;

import com.example.rhsystem.Services.EmployeService;
import com.example.rhsystem.Services.UserDetailsImp;
import com.example.rhsystem.model.Conge;
import com.example.rhsystem.Services.CongeService;
import com.example.rhsystem.model.Employe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/conges")
public class CongeController {

    @Autowired
    private CongeService congeService;

    @Autowired
    private EmployeService employeService;


    public CongeController(CongeService congeService) {
        this.congeService = congeService;
    }

    @PreAuthorize("hasRole('ROLE_EMPLOYE')")
    @PostMapping("/createConge")
    public ResponseEntity<Conge> creerConge(@RequestBody Conge conge, Authentication authentication) {
        int id = ((UserDetailsImp) authentication.getPrincipal()).getId();

        Optional<Employe> employe = employeService.findEmployeById(id);
        if (employe.isPresent()) {
            conge.setUser(employe.get());
        }
        Conge nouveauConge = congeService.creerConge(conge);

        return ResponseEntity.ok(nouveauConge);
    }

    @PreAuthorize("hasRole('ROLE_RH')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Conge>> obtenirCongesParUtilisateur(@PathVariable int userId) {
        List<Conge> conges = congeService.obtenirCongesParUtilisateur(userId);
        return ResponseEntity.ok(conges);
    }

    @PreAuthorize("hasRole('ROLE_RH')")
    @GetMapping("/en-cours")
    public ResponseEntity<List<Conge>> getCongesEnCours() {
        List<Conge> conges = congeService.getCongesByStatut("EN_COURS");
        return ResponseEntity.ok(conges);
    }

    @PreAuthorize("hasRole('ROLE_RH')")
    @PutMapping("/{idConge}")
    public ResponseEntity<Conge> mettreAJourStatut(
            @PathVariable int idConge,
            @RequestParam String statut,
            @RequestParam(required = false) String cause) {
        if ("REFUSE".equalsIgnoreCase(statut) && (cause == null || cause.trim().isEmpty())) {
            return ResponseEntity.badRequest().body(null);
        }
        Conge miseAJour = congeService.mettreAJourStatut(idConge, statut, cause);
        return ResponseEntity.ok(miseAJour);
    }

    @PreAuthorize("hasRole('ROLE_RH')")
    @GetMapping("/approved")
    public ResponseEntity<List<Conge>> getCongesApprouves() {
        List<Conge> conges = congeService.getCongesByStatut("APPROUVE");
        return ResponseEntity.ok(conges);
    }

    @PreAuthorize("hasRole('ROLE_EMPLOYE')")
    @GetMapping("/solde")
    public int getSoldeConge(Authentication authentication) {
        int id = ((UserDetailsImp) authentication.getPrincipal()).getId();
        return congeService.calculerSoldeConge(id);
    }

    @PreAuthorize("hasRole('ROLE_EMPLOYE')")
    @GetMapping("/soldeM")
    public int getSoldeCongeM(Authentication authentication) {
        int id = ((UserDetailsImp) authentication.getPrincipal()).getId();
        return congeService.calculerSoldeCongeM(id);
    }

    @PreAuthorize("hasRole('ROLE_EMPLOYE')")
    @GetMapping("/historique")
    public List<Conge> getCongeApprouves(Authentication authentication) {
        int id = ((UserDetailsImp) authentication.getPrincipal()).getId();
        return congeService.getCongeParUtilisateur(id);
    }
}
