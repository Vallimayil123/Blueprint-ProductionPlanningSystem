package com.example.ProductionPlanningSystem;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "production_plans")
@Data
public class ProductionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;

    private Long orderId;

    private String productCode;

    private Integer quantity;

    private Integer productionDays;

    private Integer dailyTarget;

    private String status;
}
