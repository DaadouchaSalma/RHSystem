package com.example.rhsystem.Controllers;

import com.example.rhsystem.Services.StatisticsService;
import com.example.rhsystem.model.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class StatisticsController {
        @Autowired
        private  StatisticsService statisticsService;

       /* public StatisticsController(StatisticsService statisticsService) {
            this.statisticsService = statisticsService;
        }*/
       @PreAuthorize("hasRole('ROLE_RH')")
        @GetMapping("/statistics")
        public Statistics getStatistics() {
            return statisticsService.getStatistics();
        }
    @PreAuthorize("hasRole('ROLE_RH')")
    @GetMapping("/department-statistics")
    public List<Statistics> getDepartmentStatistics() {
        return statisticsService.getEmployeeStatisticsByDepartment();
    }

    /*@PreAuthorize("hasRole('ROLE_RH')")
    @GetMapping("/formation-statistics")
    public List<Statistics> getFormationStatistics() {
        return statisticsService.getFormationStatistics();
    }*/
}
