package com.example.rhsystem.Request;

import lombok.Getter;

@Getter
public class LogoutRequest {
    private String refreshToken;

    // Getters and setters
    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
