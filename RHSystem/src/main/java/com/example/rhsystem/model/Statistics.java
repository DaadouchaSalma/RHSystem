package com.example.rhsystem.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Statistics {
    private long numberOfEmployees;
    private long numberOfJobOffers;
    private long numberOfDepartments;

    //formation
    private String formationName;
    private int numberOfEnrolled;
    private int numberOfAcceptedResponses;
    //employe by department
    private String department;
    private long employeeCount;

    // Getters et Setters
    public long getNumberOfEmployees() {
        return numberOfEmployees;
    }

    public void setNumberOfEmployees(long numberOfEmployees) {
        this.numberOfEmployees = numberOfEmployees;
    }

    public long getNumberOfJobOffers() {
        return numberOfJobOffers;
    }

    public void setNumberOfJobOffers(long numberOfJobOffers) {
        this.numberOfJobOffers = numberOfJobOffers;
    }

    public long getNumberOfDepartments() {
        return numberOfDepartments;
    }

    public void setNumberOfDepartments(long numberOfDepartments) {
        this.numberOfDepartments = numberOfDepartments;
    }
}
