package com.example.rhsystem.Services;

import com.example.rhsystem.Repository.UserRepo;
import com.example.rhsystem.model.Conge;
import com.example.rhsystem.Repository.CongeRepo;
import com.example.rhsystem.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import java.time.Year;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class CongeService {

    @Autowired
    private final CongeRepo congeRepository;
    @Autowired
    private UserRepo userRepository;

    public CongeService(CongeRepo congeRepository) {
        this.congeRepository = congeRepository;
    }

    public Conge creerConge(Conge conge) {
        return congeRepository.save(conge);
    }

    public List<Conge> obtenirCongesParUtilisateur(int userId) {
        return congeRepository.findByUserId(userId);
    }

    public Conge mettreAJourStatut(int idConge, String statut, String cause) {
        Conge conge = congeRepository.findById(idConge)
                .orElseThrow(() -> new RuntimeException("Conge non trouvé"));
        conge.setStatut(statut); // Statut en chaîne de caractères
        conge.setCause(cause);
        return congeRepository.save(conge);
    }

    public List<Conge> getCongesByStatut(String statut) {
        return congeRepository.findByStatut(statut);
    }

    public int calculerSoldeConge(int matriculeUser) {
        User user = userRepository.findById(matriculeUser)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        List<Conge> congesApprouves = congeRepository.findByUserAndStatut(user, "APPROUVE");
        int totalJoursPris = 0;
        for (Conge conge : congesApprouves) {
            long diff = conge.getDateFin().getTime() - conge.getDateDebut().getTime();
            totalJoursPris += (int) (diff / (1000 * 60 * 60 * 24));
        }

        int joursRestantsAn = 30 - totalJoursPris;

        return joursRestantsAn;
    }

    /*public int calculerSoldeCongeM(int matriculeUser) {
        User user = userRepository.findById(matriculeUser)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        List<Conge> congesApprouves = congeRepository.findByUserAndStatutM(user, "APPROUVE");
        int totalJoursPris = 0;
        for (Conge conge : congesApprouves) {
            long diff = conge.getDateFin().getTime() - conge.getDateDebut().getTime();
            totalJoursPris += (int) (diff / (1000 * 60 * 60 * 24));
        }

        int joursRestantsM = 2 - totalJoursPris;

        return joursRestantsM;
    }*/

    public int calculerSoldeCongeM(int matriculeUser) {
        // Fetch user
        User user = userRepository.findById(matriculeUser)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Get the current year
        int currentYear = Year.now().getValue();

        // Get the current date and start of the year
        LocalDate today = LocalDate.now();
        LocalDate startOfYear = LocalDate.of(currentYear, 1, 1);

        // Calculate months since the start of the year
        int monthsSinceStartOfYear = (int) ChronoUnit.MONTHS.between(startOfYear, today) + 1;

        // Log the calculated months
        System.out.println("Months since the start of the year: " + monthsSinceStartOfYear);

        // Calculate accrued leave (2 days per month)
        int totalAccruedLeave = monthsSinceStartOfYear * 2;

        // Get approved leave days
        List<Conge> congesApprouves = congeRepository.findByUserAndStatut(user, "APPROUVE");
        int totalJoursPris = 0;
        for (Conge conge : congesApprouves) {
            long diff = conge.getDateFin().getTime() - conge.getDateDebut().getTime();
            totalJoursPris += (int) (diff / (1000 * 60 * 60 * 24));
        }
        System.out.println("Total days of leave taken: " + totalJoursPris);

        // Remaining leave calculation
        int joursRestants = totalAccruedLeave - totalJoursPris;

        // Log the remaining leave
        System.out.println("Remaining leave days: " + joursRestants);

        // Ensure no negative leave balance
        return Math.max(joursRestants, 0);
    }



    public List<Conge> getCongeParUtilisateur(int matricule) {
        List<Conge> conges = congeRepository.findByUserId(matricule);
        System.out.println("Conge for user " + matricule + ": " + conges.size());
        return conges;
    }

}
