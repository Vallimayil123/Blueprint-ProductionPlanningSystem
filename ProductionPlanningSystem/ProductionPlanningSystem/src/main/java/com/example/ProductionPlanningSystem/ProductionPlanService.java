package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionPlanService {

    @Autowired
    private ProductionPlanRepository repository;

    public ProductionPlan createPlan(ProductionPlan plan) {

        if(plan.getProductionDays() > 0){

            plan.setDailyTarget(
                    plan.getQuantity() / plan.getProductionDays()
            );

        }

        return repository.save(plan);

    }

    public List<ProductionPlan> getAllPlans(){

        return repository.findAll();

    }

    public ProductionPlan updatePlan(Long id, ProductionPlan updated){

        ProductionPlan plan = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Plan Not Found"));

        plan.setOrderId(updated.getOrderId());
        plan.setProductCode(updated.getProductCode());
        plan.setQuantity(updated.getQuantity());
        plan.setProductionDays(updated.getProductionDays());

        if(updated.getProductionDays() > 0){

            plan.setDailyTarget(
                    updated.getQuantity()/updated.getProductionDays()
            );

        }

        plan.setStatus(updated.getStatus());

        return repository.save(plan);

    }

    public void deletePlan(Long id){

        repository.deleteById(id);

    }

}
