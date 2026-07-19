package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService service;

    @PostMapping
    public Task addTask(@RequestBody Task task){

        return service.addTask(task);

    }

    @GetMapping
    public List<Task> getTasks(){

        return service.getTasks();

    }

    @GetMapping("/my")
    public List<Task> getMyTasks(Authentication authentication){

        String username = authentication.getName();

        return service.getTasksByEmployee(username);

    }

    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task task){

        return service.updateTask(id, task);

    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){

        service.deleteTask(id);

    }

}