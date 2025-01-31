package com.example.rhsystem.Controllers;

import com.example.rhsystem.Services.UserDetailsImp;
import com.example.rhsystem.Services.UserService;
import com.example.rhsystem.model.Employe;
import com.example.rhsystem.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")

public class UserController {
    @Autowired
    UserService userService;
    @PreAuthorize("hasRole('ROLE_RH') or hasAnyRole('ROLE_EMPLOYE')")
    @GetMapping("/profileEmp")
    public ResponseEntity<Optional<User>> getUser(Authentication authentication) {

        // Get the user ID from the Authentication object
        int id = ((UserDetailsImp) authentication.getPrincipal()).getId();

        Optional<User> user = userService.findUserById(id);
        System.out.println(user);
        if (user != null) {

            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PreAuthorize("hasRole('ROLE_RH') or hasAnyRole('ROLE_EMPLOYE')")
    @PutMapping("/updateProfile")
    public ResponseEntity<User> updateUserProfile(
            @RequestBody Map<String, Object> updates , Authentication authentication) {
        try {
            int id = ((UserDetailsImp) authentication.getPrincipal()).getId();
            User updatedUser = userService.updateProfile(id, updates);
            return ResponseEntity.ok(updatedUser);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}
