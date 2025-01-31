package com.example.rhsystem.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.Getter;

@Getter
public class LoginRequest {
    @NotBlank
    private String mail;
    @NotBlank
    private String password;
}
