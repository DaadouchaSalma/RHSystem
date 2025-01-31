package com.example.rhsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PaiementDTO {
    private int id_paiement;
    private int overtimeHours;
    private double bonus;
    private double deductions;
    private String month;
    private String status;
    private double salaireBrut;
    private double salaireNet;
}
