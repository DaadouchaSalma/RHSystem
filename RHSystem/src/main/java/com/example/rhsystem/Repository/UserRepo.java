package com.example.rhsystem.Repository;

import com.example.rhsystem.model.Employe;
import com.example.rhsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByMail(String mail);
    Boolean existsByUsername(String username);
    Boolean existsByMail(String email);
    Optional<User> findById(Integer id);
}
