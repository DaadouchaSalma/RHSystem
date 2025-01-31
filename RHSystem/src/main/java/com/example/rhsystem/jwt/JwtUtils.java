package com.example.rhsystem.jwt;

import com.example.rhsystem.Services.UserDetailsImp;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import java.util.Date;


@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${yosr.app.jwtSecret}")
    private String jwtSecret;

    @Value("${yosr.app.jwtExpirationMs}")
    private int jwtExpirationMs;

   /* public String generateJwtToken(UserDetailsImp userPrincipal) {
        return generateTokenFromUsername(userPrincipal.getUsername());
    }*/
   public String generateJwtToken(UserDetailsImp userPrincipal) {
       return generateTokenFromUsername(userPrincipal.getMail());
   }

    public String generateTokenFromUsername(String mail) {
        return Jwts.builder().setSubject(mail).setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)).signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUsernameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        }catch (SignatureException e) {
            logger.error("Invalid JWT signature", e.getMessage());
        }catch (MalformedJwtException e){
            logger.error("Invalid JWT token", e.getMessage());
        }catch (ExpiredJwtException e){
            logger.error("Expired JWT token", e.getMessage());
        }catch (UnsupportedJwtException e){
            logger.error("Unsupported JWT token", e.getMessage());
        }catch (IllegalArgumentException e){
            logger.error("JWT claims string is empty", e.getMessage());
        }
        logger.info("JWT Secret: " + jwtSecret);
        logger.info("JWT Token: " + authToken);
        return false;
    }
}
