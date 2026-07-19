package com.example.ProductionPlanningSystem;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="production_tracking")
@Data
public class ProductionTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trackingId;

    private Long planId;

    private Integer plannedQuantity;

    private Integer actualQuantity;

    private Integer remainingQuantity;

    private Double progress;

    private String status;
}