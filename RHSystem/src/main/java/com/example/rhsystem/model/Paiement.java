package com.example.rhsystem.model;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Paiement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_paiement;
    private int overtimeHours;
    private double bonus;
    private double deductions;
    private String month;
    private String status = "En attente";
    private double salaireBrut;
    private double salaireNet;
    @ManyToOne
    @JoinColumn(name="user_id")

    private User user;
}