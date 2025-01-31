package com.example.rhsystem.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmployeDTO {
    private int id;
    private String nom;
    private String prenom;
    private String mail;
    private Long numTelephone;
    private String password;
    private String poste;
    private String departement;
    @Temporal(TemporalType.DATE)
    private Date dateofjoining;
    private String maladie;
    private Long numUrgence;
    private int nbHeures;
    private String adresse;
    @Temporal(TemporalType.DATE)
    private Date dateDeNaissance;
    @Column(name = "cv_path")
    private String cvPath;
    @Column(name = "contrat_de_travail_path")
    private String contratDeTravailPath;
    private double baseSalary;
    private double hourlyRate;
    // Constructor
    public EmployeDTO(int matricule, String nom,String prenom, String mail) {
        this.id = matricule;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
}

