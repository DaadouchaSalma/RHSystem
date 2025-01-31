package com.example.rhsystem.Services;


import com.example.rhsystem.Repository.UserRepo;
import com.example.rhsystem.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImp implements UserDetailsService {
    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByMail(username)
                .orElseThrow(() -> new UsernameNotFoundException("user not found with username"+username));

        return UserDetailsImp.build(user);
    }
}
