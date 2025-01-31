package com.example.rhsystem.Response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String refreshToken;
    private int id;
    private String email;
    //private String userName;
    private List<String> roles;

    public JwtResponse(String accessToken, String refreshToken, int id, String email, List<String> roles) {
        this.token = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.email = email;
        //this.userName = userName;
        this.roles = roles;
    }
}

