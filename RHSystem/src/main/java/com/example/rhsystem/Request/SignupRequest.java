package com.example.rhsystem.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;
@Getter
@Setter
public class SignupRequest {
    @NotBlank
    @Size(min = 2, max = 20)
    private String username;

    @NotBlank
    @Size(max= 50)
    @Email
    private String mail;

    private Set<String> roles;

    @NotBlank
    @Size(min= 6, max = 40)
    private String password;

    @NotBlank
    private String nom;

    @NotBlank
    private String prenom;

    private Long numTelephone;

    private String poste;

    private String departement;

    private Date dateofjoining;

    private String maladie;

    private Long numUrgence;

    private int nbHeures;

    private String adresse;

    private Date dateDeNaissance;
    private String img;

    private String cvPath;

    private String contratDeTravailPath;
}
