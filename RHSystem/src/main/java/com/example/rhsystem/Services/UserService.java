package com.example.rhsystem.Services;

import com.example.rhsystem.Repository.UserRepo;
import com.example.rhsystem.model.Employe;
import com.example.rhsystem.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService{
    @Autowired
    UserRepo userRepo;
    public Optional<User> findUserById(int id) {
        return userRepo.findById(id) ;// Ensure id type matches the one in the repository
    }
    public User updateProfile(int id, Map<String, Object> updates) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        // Dynamically update fields
        updates.forEach((key, value) -> {
            switch (key) {
                case "numTelephone":
                    user.setNumTelephone(Long.parseLong(value.toString()));
                    break;
                case "adresse":
                    user.setAdresse(value.toString());
                    break;
                case "maladie":
                    user.setMaladie(value.toString());
                    break;
                case "numUrgence":
                    user.setNumUrgence(Long.parseLong(value.toString()));
                    break;
                default:
                    throw new IllegalArgumentException("Field not updatable: " + key);
            }
        });

        return userRepo.save(user);
    }
}
