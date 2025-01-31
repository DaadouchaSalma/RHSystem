package com.example.rhsystem.Controllers;

import com.example.rhsystem.Repository.EmployeRepo;
import com.example.rhsystem.Services.EmployeService;
import com.example.rhsystem.Services.PaiementService;
import com.example.rhsystem.Services.UserDetailsImp;
import com.example.rhsystem.dto.EmployeDTO;
import com.example.rhsystem.dto.FormationDTO;
import com.example.rhsystem.dto.PaiementDTO;
import com.example.rhsystem.model.Employe;
import com.example.rhsystem.model.Paiement;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/paiement")

public class PaiementController {
    @Autowired
    PaiementService paiementService;
    @Autowired
    private EmployeRepo employeRepository;
    @Autowired
    private EmployeService employeService;
    @Autowired
    private ObjectMapper mapper;

    @PreAuthorize("hasRole('ROLE_EMPLOYE')")
    @GetMapping("/Consulterfiche")
    public ResponseEntity<Map<String, Object>> getPaiementsByUserId(Authentication authentication) throws JsonProcessingException {
        int employeeId = ((UserDetailsImp) authentication.getPrincipal()).getId();
        EmployeDTO employe = employeService.convertToDto(
                employeRepository.findById(employeeId).orElseThrow(() -> new EntityNotFoundException("Employee not found with ID: " + employeeId))
        );
        // Récupérer les paiements liés à l'employé
        List<PaiementDTO> paiements = paiementService.mapPaiementsToDTOs(paiementService.getPaiementByUserId(employeeId));

        // Construire la réponse sous forme de Map
        Map<String, Object> response = new HashMap<>();
        response.put("id", employe.getId());
        response.put("nom", employe.getNom());
        response.put("prenom", employe.getPrenom());
        response.put("poste", employe.getPoste());
        response.put("departement", employe.getDepartement());
        response.put("dateofjoining", employe.getDateofjoining());
        response.put("baseSalary", employe.getBaseSalary());
        response.put("hourlyRate", employe.getHourlyRate());
        response.put("paiements", paiements);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ROLE_RH')")
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/employees")
    public List<EmployeDTO> getAllEmployees() {
        return employeService.getAllEmployees().stream()
                .map(employeService::convertToDto)
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ROLE_RH')")
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/payments")
    public List<Paiement> getPayments() {
        List<Paiement> p=paiementService.getAllPayments();
        System.out.println(p.size());
        return paiementService.getAllPayments();
    }

    @PreAuthorize("hasRole('ROLE_RH')")
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/calculateSalary/{employeeId}")
    public ResponseEntity<Paiement> calculateSalary(
            @PathVariable int employeeId,
            @RequestBody Paiement paiementData) {
        try {
            Paiement paiement = paiementService.calculateSalary(
                    employeeId,
                    paiementData.getBonus(),
                    paiementData.getDeductions(),
                    paiementData.getOvertimeHours(),
                    paiementData.getMonth()
            );
            return ResponseEntity.ok(paiement);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PreAuthorize("hasRole('ROLE_RH')")
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/overtime-par-month/{year}")
    public List<Paiement> getOvertimePerMonth(@PathVariable int year) {
        return paiementService.getOvertimeParMonth(year);
    }

}
