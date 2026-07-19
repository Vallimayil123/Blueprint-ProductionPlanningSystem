package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tracking")
public class ProductionTrackingController {

    @Autowired
    private ProductionTrackingService service;

    @PostMapping
    public ProductionTracking add(
            @RequestBody ProductionTracking tracking){

        return service.save(tracking);

    }

    @GetMapping
    public List<ProductionTracking> getAll(){

        return service.getAll();

    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id){

        service.delete(id);

    }

}
