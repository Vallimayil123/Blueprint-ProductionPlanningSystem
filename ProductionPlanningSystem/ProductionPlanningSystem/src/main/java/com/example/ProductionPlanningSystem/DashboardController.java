package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    ProductionPlanRepository planRepository;

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    InventoryRepository inventoryRepository;

    @GetMapping("/counts")
    public Map<String, Long> counts() {

        return Map.of(

                "products", productRepository.count(),

                "orders", orderRepository.count(),

                "employees", employeeRepository.count(),

                "plans", planRepository.count(),

                "tasks", taskRepository.count(),

                "inventory", inventoryRepository.count()

        );

    }

}