package com.example.rhsystem.Services;

import com.example.rhsystem.Repository.OffreEmploiRepo;
import com.example.rhsystem.model.OffreEmploi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OffreEmploiService {
    @Autowired
    OffreEmploiRepo offreEmploiRepo;

    public OffreEmploi CreateOffreEmploi(OffreEmploi offreEmploi) {

        return offreEmploiRepo.save(offreEmploi);
    }
    public List<OffreEmploi> getAllOffreEmploi() {  return offreEmploiRepo.findAll(); }
    public OffreEmploi getOffreEmploiById(int id) {  return offreEmploiRepo.findById(id).get(); }
}