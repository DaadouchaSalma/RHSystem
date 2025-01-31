package com.example.rhsystem.Services;

import com.example.rhsystem.Repository.ResponsableRHRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResponsableRHService {
    @Autowired
    ResponsableRHRepo responsableRHRepo;
}
