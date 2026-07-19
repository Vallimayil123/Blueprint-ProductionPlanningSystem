package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionTrackingService {

    @Autowired
    private ProductionTrackingRepository repository;

    public ProductionTracking save(ProductionTracking tracking){

        tracking.setRemainingQuantity(
                tracking.getPlannedQuantity()-tracking.getActualQuantity()
        );

        tracking.setProgress(

                (tracking.getActualQuantity()*100.0)/
                        tracking.getPlannedQuantity()

        );

        if(tracking.getProgress()>=100)

            tracking.setStatus("Completed");

        else

            tracking.setStatus("Delayed");

        return repository.save(tracking);

    }

    public List<ProductionTracking> getAll(){

        return repository.findAll();

    }

    public void delete(Long id){

        repository.deleteById(id);

    }

}