package com.example.rhsystem.Services;

import com.example.rhsystem.Repository.EmployeRepo;
import com.example.rhsystem.Repository.FormationRepo;
import com.example.rhsystem.Repository.OffreEmploiRepo;
import com.example.rhsystem.model.Statistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticsService {
    @Autowired
    EmployeRepo employeeRepository;
    @Autowired
    OffreEmploiRepo jobOfferRepository;
    @Autowired
    FormationRepo formationRepo;

    public Statistics getStatistics() {
        Statistics statistics = new Statistics();
        statistics.setNumberOfEmployees(employeeRepository.count_employe());
        statistics.setNumberOfJobOffers(jobOfferRepository.count_offre());
       statistics.setNumberOfDepartments(employeeRepository.count_dep());

        return statistics;
    }
    public List<Statistics> getEmployeeStatisticsByDepartment() {
        List<Object[]> rawStatistics = employeeRepository.countEmployeesByDepartment();
        List<Statistics> statistics = new ArrayList<>();

        for (Object[] row : rawStatistics) {
            String department = (String) row[0];
            long employeeCount = ((Number) row[1]).longValue();
            // Create an instance and set values using setters
            Statistics statistics1 = new Statistics();
            statistics1.setDepartment(department);
            statistics1.setEmployeeCount(employeeCount);
            statistics.add(statistics1);
        }

        return statistics;
    }
    /*public List<Statistics> getFormationStatistics() {
        List<Object[]> rawStatistics = formationRepo.getFormationStatistics();
        List<Statistics> statistics = new ArrayList<>();

        for (Object[] row : rawStatistics) {
            String formationName = (String) row[0];
            int numberOfAcceptedResponses = ((Number) row[1]).intValue();
            Statistics statistics1 = new Statistics();
            statistics1.setFormationName(formationName);
            statistics1.setNumberOfAcceptedResponses(numberOfAcceptedResponses);
            statistics.add(statistics1);
        }

        return statistics;
    }*/
}
