package com.example.rhsystem.Repository;

import com.example.rhsystem.model.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeRepo extends JpaRepository<Employe,Integer> {
    @Query("SELECT e FROM Employe e WHERE e.nom LIKE :nom%")
    List<Employe> findByNom(@Param("nom") String nom);
    @Query("SELECT e FROM Employe e WHERE e.departement LIKE :departement")
    List<Employe> findByDepartement(@Param("departement") String departement);
    @Query("SELECT e FROM Employe e WHERE e.departement LIKE :departement AND e.nom LIKE :nom%")
    List<Employe> searchEmployees(@Param("nom") String nom, @Param("departement") String departement);
    //ZYEDA
    Optional<Employe> findById(Integer id);
    @Query("select count(*) from Employe ")
    Long count_employe();
    @Query("select count(distinct (departement)) from Employe ")
    Long count_dep();
    @Query("SELECT e.departement AS department, COUNT(e) AS employeeCount FROM Employe e GROUP BY e.departement")
    List<Object[]> countEmployeesByDepartment();
}
