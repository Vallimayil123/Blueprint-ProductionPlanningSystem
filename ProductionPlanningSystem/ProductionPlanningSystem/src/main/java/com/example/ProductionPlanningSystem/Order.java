package com.example.ProductionPlanningSystem;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;

    @Column(name = "product_code")
    private String productCode;

    private Integer quantity;

    private String deadline;      // e.g. 2026-07-20

    private String status;        // Pending, In Progress, Delivered

}