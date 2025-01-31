package com.example.rhsystem.Repository;

import com.example.rhsystem.model.ResponsableRH;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponsableRHRepo extends JpaRepository<ResponsableRH, Integer> {
}
