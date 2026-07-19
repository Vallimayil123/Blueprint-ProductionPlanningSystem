package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository repository;

    public Inventory save(Inventory inventory){

        inventory.setRemainingStock(
                inventory.getAvailableStock() -
                        inventory.getUsedStock());

        if(inventory.getRemainingStock() <= 20)
            inventory.setStatus("Low Stock");
        else
            inventory.setStatus("Available");

        return repository.save(inventory);
    }

    public List<Inventory> getAll(){
        return repository.findAll();
    }

    public Inventory update(Long id, Inventory updated){

        Inventory inventory = repository.findById(id).orElseThrow();

        inventory.setMaterialName(updated.getMaterialName());
        inventory.setAvailableStock(updated.getAvailableStock());
        inventory.setUsedStock(updated.getUsedStock());

        inventory.setRemainingStock(
                updated.getAvailableStock() -
                        updated.getUsedStock());

        if(inventory.getRemainingStock() <= 20)
            inventory.setStatus("Low Stock");
        else
            inventory.setStatus("Available");

        return repository.save(inventory);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

}