package com.example.rhsystem.Repository;


import com.example.rhsystem.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> deleteByToken(String token);
    @Modifying
    @Transactional
    @Query("DELETE FROM refreshtoken r WHERE r.user.id = :userId")
    void deleteByUserId(@Param("userId") int userId);
}

