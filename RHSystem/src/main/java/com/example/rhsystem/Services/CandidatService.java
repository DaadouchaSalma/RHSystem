package com.example.rhsystem.Services;

import com.example.rhsystem.Repository.CandidatRepo;
import com.example.rhsystem.Repository.OffreEmploiRepo;
import com.example.rhsystem.model.Candidat;
import com.example.rhsystem.model.OffreEmploi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service

public class CandidatService {
    @Autowired
    CandidatRepo candidatRepo;
    @Autowired
    OffreEmploiRepo offreEmploiRepo;

    public Candidat saveCandidat(Candidat candidat, int idOffre){
        System.out.println("Matricule: " + candidat.getIdCandidat());
        System.out.println("Nom: " + candidat.getNom());
        System.out.println("Prenom: " + candidat.getPrenom());
        System.out.println("Mail: " + candidat.getMail());
        System.out.println("NumTelephone: " + candidat.getNumTelephone());

        OffreEmploi offreEmploi = offreEmploiRepo.findById(idOffre)
                .orElseThrow(() -> new NoSuchElementException("Offre d'emploi introuvable"));

        // Lier le candidat à l'offre d'emploi
        offreEmploi.getCandidats().add(candidat);
        candidat.getOffreEmploiList().add(offreEmploi);

        return candidatRepo.save(candidat) ;
    }

    public List<Candidat> getAllCandidats() {
        return candidatRepo.findAll();
    }
}
