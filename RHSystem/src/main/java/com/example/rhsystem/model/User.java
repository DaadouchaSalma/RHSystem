package com.example.rhsystem.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Getter
@Setter

@Entity

@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    //private int matricule;
    private String nom;
    private String username;
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
    @Column(name = "img")
    private String img;
    @Column(name = "contrat_de_travail_path")
    private String contratDeTravailPath;
    private double baseSalary;
    private double hourlyRate;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Conge> congeList=new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Paiement> listpaiement=new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles" ,
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(String username, String email, String password) {
        this.username = username;
        this.mail = email;
        this.password = password;
    }
    public User() {}
}
