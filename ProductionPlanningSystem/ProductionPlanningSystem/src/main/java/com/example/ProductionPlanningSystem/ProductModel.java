package com.example.ProductionPlanningSystem;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data // Lombok for getters/setters
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String name;
    private String code;
    private Double price;
    private Integer productionTime;
}
