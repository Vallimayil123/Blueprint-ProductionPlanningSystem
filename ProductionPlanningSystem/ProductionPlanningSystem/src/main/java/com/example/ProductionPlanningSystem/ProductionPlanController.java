package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
public class ProductionPlanController {

    @Autowired
    private ProductionPlanService service;

    @PostMapping
    public ProductionPlan createPlan(
            @RequestBody ProductionPlan plan){

        return service.createPlan(plan);

    }

    @GetMapping
    public List<ProductionPlan> getPlans(){

        return service.getAllPlans();

    }

    @PutMapping("/{id}")
    public ProductionPlan updatePlan(
            @PathVariable Long id,
            @RequestBody ProductionPlan plan){

        return service.updatePlan(id, plan);

    }

    @DeleteMapping("/{id}")
    public void deletePlan(
            @PathVariable Long id){

        service.deletePlan(id);

    }

}