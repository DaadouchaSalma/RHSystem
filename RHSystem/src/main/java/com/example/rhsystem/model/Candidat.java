package com.example.rhsystem.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@Entity
public class Candidat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCandidat;
    private String nom;
    private String prenom;
    private String mail;
    private Long numTelephone;
    private String cvPath;
    @ManyToMany(mappedBy = "candidats")
    private List<OffreEmploi> offreEmploiList= new ArrayList<>();

}
