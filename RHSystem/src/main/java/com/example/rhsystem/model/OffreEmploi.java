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
public class OffreEmploi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idOffre;
    private String titre;
    @Lob
    private String description;
    @Lob
    private String minimumQualifications;
    @Lob
    private String preferredQualifications;
    @Lob
    private String responsibilities;
    @Temporal(TemporalType.DATE)
    private Date datePublication;
    @ManyToOne
    @JoinColumn(name = "RHId")
    private ResponsableRH responsableRH;
    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "OffreEmploiCandidat",
            joinColumns = @JoinColumn (name="offreEmploiId"),
            inverseJoinColumns = @JoinColumn (name = "candidatId")
    )
    private List<Candidat> candidats=new ArrayList<>();


}
