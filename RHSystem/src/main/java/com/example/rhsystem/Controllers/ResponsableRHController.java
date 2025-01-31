package com.example.rhsystem.Controllers;

import com.example.rhsystem.Services.ResponsableRHService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller

public class ResponsableRHController {
    @Autowired
    ResponsableRHService responsableRHService;

}
