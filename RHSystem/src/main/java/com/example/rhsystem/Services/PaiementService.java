package com.example.rhsystem.Services;

import com.example.rhsystem.Repository.EmployeRepo;
import com.example.rhsystem.Repository.PaiementRepo;
import com.example.rhsystem.dto.PaiementDTO;
import com.example.rhsystem.model.Formation;
import com.example.rhsystem.model.Paiement;
import com.example.rhsystem.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaiementService {
    @Autowired
    PaiementRepo paiementRepo;
    @Autowired
    private EmployeService employeeService;
    @Autowired
    private EmployeRepo employeRepo;

    public List<PaiementDTO> mapPaiementsToDTOs(List<Paiement> paiements) {
        return paiements.stream()
                .map(p -> {
                    PaiementDTO dto = new PaiementDTO();
                    dto.setId_paiement(p.getId_paiement());
                    dto.setOvertimeHours(p.getOvertimeHours());
                    dto.setBonus(p.getBonus());
                    dto.setDeductions(p.getDeductions());
                    dto.setMonth(p.getMonth());
                    dto.setStatus(p.getStatus());
                    dto.setSalaireBrut(p.getSalaireBrut());
                    dto.setSalaireNet(p.getSalaireNet());
                    return dto;
                }).collect(Collectors.toList());
    }

    public List<Paiement> getPaiementByUserId(int employeeId) {
       return paiementRepo.findByUserId(employeeId);
    }
    public List<Paiement> getAllPayments() {
        return paiementRepo.findAll();
    }

    public Paiement calculateSalary(int employeeId, double bonus, double deductions, int overtimeHours, String month) {
        // Vérifier si l'employé existe
        User employee = employeRepo.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));

        Paiement existingPaiement = paiementRepo.findByUserMatriculeAndMonth(employeeId, month);

        double taxRate = 0.15;  // Exemple : 15%
        double cnssRate = 0.09; // Exemple : 9%

        if (existingPaiement != null) {
            // Mettre à jour les champs du paiement existant
            existingPaiement.setBonus(bonus);
            existingPaiement.setDeductions(deductions);
            existingPaiement.setOvertimeHours(overtimeHours);

            // Calculer le salaire brut
            double baseSalary = employee.getBaseSalary();
            double grossSalary = baseSalary + bonus + (overtimeHours * employee.getHourlyRate());
            existingPaiement.setSalaireBrut(grossSalary);

            // Appliquer les taux pour obtenir le salaire net
            double tax = grossSalary * taxRate;
            double cnss = grossSalary * cnssRate;
            double netSalary = grossSalary - tax - cnss - deductions;

            netSalary = Math.round(netSalary * 100.0) / 100.0;
            existingPaiement.setSalaireNet(netSalary);
            existingPaiement.setStatus("Calculé");

            return paiementRepo.save(existingPaiement);
        } else {
            // Créer un nouveau paiement
            Paiement newPaiement = new Paiement();
            newPaiement.setUser(employee);
            newPaiement.setBonus(bonus);
            newPaiement.setDeductions(deductions);
            newPaiement.setOvertimeHours(overtimeHours);
            newPaiement.setMonth(month);
            newPaiement.setStatus("Calculé");

            // Calculer le salaire brut
            double baseSalary = employee.getBaseSalary();
            double grossSalary = baseSalary + bonus + (overtimeHours * employee.getHourlyRate());
            newPaiement.setSalaireBrut(grossSalary);

            // Appliquer les taux pour obtenir le salaire net
            double tax = grossSalary * taxRate;
            double cnss = grossSalary * cnssRate;
            double netSalary = grossSalary - tax - cnss - deductions;

            netSalary = Math.round(netSalary * 100.0) / 100.0;
            newPaiement.setSalaireNet(netSalary);

            return paiementRepo.save(newPaiement);
        }
    }
    public List<Paiement> getOvertimeParMonth(int year) {
        return paiementRepo.findOvertimeByYear(year);
    }

}
