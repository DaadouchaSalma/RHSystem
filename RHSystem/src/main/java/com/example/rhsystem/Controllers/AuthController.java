package com.example.rhsystem.Controllers;

import com.example.rhsystem.Repository.EmployeRepo;
import com.example.rhsystem.Repository.RoleRepo;
import com.example.rhsystem.Repository.UserRepo;
import com.example.rhsystem.Request.LoginRequest;
import com.example.rhsystem.Request.LogoutRequest;
import com.example.rhsystem.Request.SignupRequest;
import com.example.rhsystem.Response.JwtResponse;
import com.example.rhsystem.Response.MessageResponse;
import com.example.rhsystem.Services.EmployeService;
import com.example.rhsystem.Services.RefreshTokenService;
import com.example.rhsystem.Services.UserDetailsImp;
import com.example.rhsystem.jwt.JwtUtils;
import com.example.rhsystem.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.*;


import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepo userRepo;
    @Autowired
    RoleRepo roleRepo;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    RefreshTokenService refreshTokenService;
    @Autowired
    private EmployeService employeService;
    @Autowired
    private EmployeRepo employeRepo;

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    /*
        @PostMapping("/signup")
        public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
            if (userRepo.existsByUsername(signupRequest.getUsername())){
                return ResponseEntity.badRequest()
                        .body("Username is already in use");
            }

            if (userRepo.existsByMail(signupRequest.getEmail())) {
                return ResponseEntity.badRequest()
                        .body("Email is already in use");
            }

            User user = new User(signupRequest.getUsername(), signupRequest.getEmail(),
                    passwordEncoder.encode(signupRequest.getPassword()));

            Set<String> strRoles = signupRequest.getRoles();
            Set<Role> roles = new HashSet<>();

            if(strRoles == null){
                Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Role not found"));
                roles.add(userRole);
            }else {
                strRoles.forEach(role -> {
                    switch (role) {
                        case "responsable":
                            Role adminRole = roleRepo.findByName(ERole.ROLE_RH)
                                    .orElseThrow(() -> new RuntimeException("Role not found"));
                            roles.add(adminRole);
                            break;

                        case "employé":
                            Role modRole = roleRepo.findByName(ERole.ROLE_EMPLOYE)
                                    .orElseThrow(() -> new RuntimeException("Role not found"));
                            roles.add(modRole);
                            break;
                        default:
                            Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                                    .orElseThrow(() -> new RuntimeException("Role not found"));
                            roles.add(userRole);


                    }
                });
            }
            user.setRoles(roles);
            userRepo.save(user);
            return ResponseEntity.ok(new MessageResponse("success"));


        }*/
@PostMapping("/signup")
public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
    /*if (userRepo.existsByUsername(signupRequest.getUsername())) {
        return ResponseEntity.badRequest().body("Username is already in use");
    }*/

    if (userRepo.existsByMail(signupRequest.getMail())) {
        return ResponseEntity.badRequest().body("Email is already in use");
    }

    // Create a new user instance and populate all fields
    Employe user = new Employe();
    //user.setUsername(signupRequest.getUsername());
    user.setMail(signupRequest.getMail());
    user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
    user.setNom(signupRequest.getNom());
    user.setPrenom(signupRequest.getPrenom());
    user.setNumTelephone(signupRequest.getNumTelephone());
    user.setPoste(signupRequest.getPoste());
    user.setDepartement(signupRequest.getDepartement());
    user.setDateofjoining(signupRequest.getDateofjoining());
    user.setMaladie(signupRequest.getMaladie());
    user.setNumUrgence(signupRequest.getNumUrgence());
    user.setNbHeures(signupRequest.getNbHeures());
    user.setAdresse(signupRequest.getAdresse());
    user.setDateDeNaissance(signupRequest.getDateDeNaissance());
    user.setCvPath(signupRequest.getCvPath());
    user.setContratDeTravailPath(signupRequest.getContratDeTravailPath());
    user.setImg(signupRequest.getImg());

    // Set roles
    Set<String> strRoles = signupRequest.getRoles();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
        Role userRole = roleRepo.findByName(ERole.ROLE_EMPLOYE)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        roles.add(userRole);
    } else {
        strRoles.forEach(role -> {
            switch (role) {
                case "responsable":
                    Role adminRole = roleRepo.findByName(ERole.ROLE_RH)
                            .orElseThrow(() -> new RuntimeException("Role not found"));
                    roles.add(adminRole);
                    break;

               /* case "employé":
                    Role modRole = roleRepo.findByName(ERole.ROLE_EMPLOYE)
                            .orElseThrow(() -> new RuntimeException("Role not found"));
                    roles.add(modRole);
                    break;*/

                default:
                    Role userRole = roleRepo.findByName(ERole.ROLE_EMPLOYE)
                            .orElseThrow(() -> new RuntimeException("Role not found"));
                    roles.add(userRole);
            }
        });
    }
    user.setRoles(roles);
    employeService.saveEmploye(user);


    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
}


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getMail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(userDetails);


        List<String> roles = userDetails.getAuthorities()
                .stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken(),
                userDetails.getId(),
                userDetails.getMail(),
                 roles));
    }
    /*@PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestBody LogoutRequest logoutRequest) {
        String refreshToken = logoutRequest.getRefreshToken();
        SecurityContextHolder.clearContext();
        refreshTokenService.deleteByToken(refreshToken); // Invalidate the token
        return ResponseEntity.ok("Logout successful!");
    }*/
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        UserDetailsImp userDetails = (UserDetailsImp) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int userId = userDetails.getId();
        refreshTokenService.deleteByUserId(userId);
        return ResponseEntity.ok(new MessageResponse("Log out successful!"));
    }
}
