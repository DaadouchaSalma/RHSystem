package com.example.rhsystem.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity

public class ResponsableRH extends User {


    @OneToMany(mappedBy = "responsableRH",cascade = CascadeType.ALL)
    private List<Formation> Formations = new ArrayList<>();
    @OneToMany(mappedBy = "responsableRH",cascade = CascadeType.ALL)
    private List<OffreEmploi> OffreEmplois = new ArrayList<>();


}
