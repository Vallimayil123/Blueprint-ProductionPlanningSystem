package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService service;

    @PostMapping
    public Inventory add(@RequestBody Inventory inventory){
        return service.save(inventory);
    }

    @GetMapping
    public List<Inventory> getAll(){
        return service.getAll();
    }

    @PutMapping("/{id}")
    public Inventory update(
            @PathVariable Long id,
            @RequestBody Inventory inventory){
        return service.update(id, inventory);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }

}