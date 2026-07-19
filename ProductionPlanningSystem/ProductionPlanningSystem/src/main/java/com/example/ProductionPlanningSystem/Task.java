package com.example.ProductionPlanningSystem;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tasks")
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    private Long planId;

    private String employeeName;

    private String department;

    private String taskDescription;

    private String status;
}