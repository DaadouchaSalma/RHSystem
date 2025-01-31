package com.example.rhsystem.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class FormationDTO {
    private int idF;
    private String titre;
    private String description;
    private String formateur;
    private String photoPath;
    private Date dateDebutF;
    private Date dateFinF;
    private List<Integer> employes;
    private List<EmployeDTO> employees; // Limited details for employees
    private Map<Integer, String> responses;
    private String formUrl;

}
