package com.example.rhsystem.Repository;

import com.example.rhsystem.model.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidatRepo extends JpaRepository<Candidat, Integer> {
}
