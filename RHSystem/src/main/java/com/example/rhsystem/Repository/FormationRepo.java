package com.example.rhsystem.Repository;

import com.example.rhsystem.model.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface FormationRepo extends JpaRepository<Formation, Integer> {
    boolean existsByIdF(int idF);

    @Modifying
    @Query(value = "DELETE FROM employe_formation WHERE formation_id = :formationId", nativeQuery = true)
    void clearFormationEmployees(@Param("formationId") Integer formationId);
    @Query("SELECT f FROM Formation f JOIN f.employes e WHERE e.id = :id")
    List<Formation> findByEmployesId(@Param("id") int id);

    List<Formation> findByDateFinF(Date datef);
    /*@Query("SELECT f, Count(*) AS numberOfAcceptedResponses FROM Formation f Where f.responses='accepted'")
    List<Object[]> getFormationStatistics();*/

}
