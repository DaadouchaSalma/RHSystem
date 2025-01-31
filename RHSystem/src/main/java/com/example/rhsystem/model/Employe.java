package com.example.rhsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Employe extends User {

    @ManyToMany
    @JoinTable(
            name = "EmployeFormation",
            joinColumns = @JoinColumn(name = "matricule_employe"),
            inverseJoinColumns = @JoinColumn(name = "formationId")

    )
    @JsonIgnore
    private List<Formation> formationList=new ArrayList<>();





}
