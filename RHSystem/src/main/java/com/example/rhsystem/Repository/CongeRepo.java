package com.example.rhsystem.Repository;

import com.example.rhsystem.model.Conge;
import com.example.rhsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CongeRepo extends JpaRepository<Conge, Integer> {
    List<Conge> findByUserId(int userId);
    List<Conge> findByStatut(String statut);
    @Query("SELECT c FROM Conge c WHERE c.user = :user AND c.statut = :statut AND FUNCTION('YEAR', c.dateDebut) = FUNCTION('YEAR', CURRENT_DATE)")
    List<Conge> findByUserAndStatut(@Param("user") User user, @Param("statut") String statut);
}
