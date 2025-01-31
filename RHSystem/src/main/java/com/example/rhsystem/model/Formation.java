package com.example.rhsystem.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
@Entity
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idF;
    private String titre;
    private String description;
    private String formateur;
    @Temporal(TemporalType.DATE)
    private Date dateDebutF;
    @Temporal(TemporalType.DATE)
    private Date dateFinF;
    private String photoPath ;
    @ManyToMany(mappedBy = "formationList")
    private List<Employe> employes= new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "RHId")
    private ResponsableRH responsableRH;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "formation_responses",
            joinColumns = @JoinColumn(name = "idF")
    )
    @MapKeyColumn(name = "id")
    @Column(name = "response")
    private Map<Integer, String> responses = new HashMap<>();
    private String formUrl;


}
