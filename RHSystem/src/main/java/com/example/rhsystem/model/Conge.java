package com.example.rhsystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Conge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idConge;
    @Temporal(TemporalType.DATE)
    private Date dateDebut;
    @Temporal(TemporalType.DATE)
    private Date dateFin;
    private String typeConge="VACANCES";
    private String statut = "EN_COURS";
    private String cause;
    private String commentaire="non commentaire";

    @ManyToOne
    @JoinColumn(name = "matricule_user")
    private User user;

}
