package com.example.rhsystem.Repository;

import com.example.rhsystem.model.Formation;
import com.example.rhsystem.model.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaiementRepo extends JpaRepository<Paiement,Integer> {
    @Query("SELECT p FROM Paiement p WHERE p.user.id = :userId")
    List<Paiement> findByUserId(@Param("userId") int userId);
    @Query("select p from Paiement p where p.user.id= :userId and p.month= :month")
    Paiement findByUserMatriculeAndMonth(@Param("userId")int userId, @Param("month")String month);
    @Query("SELECT p FROM Paiement p WHERE SUBSTRING(p.month, 1, 4) = ?1")
    List<Paiement> findOvertimeByYear(int year);
}
