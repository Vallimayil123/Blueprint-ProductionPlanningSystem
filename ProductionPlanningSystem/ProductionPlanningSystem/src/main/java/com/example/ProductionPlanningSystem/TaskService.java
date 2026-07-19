package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    public Task addTask(Task task){

        return repository.save(task);

    }

    public List<Task> getTasks(){

        return repository.findAll();

    }

    public List<Task> getTasksByEmployee(String employeeName){

        return repository.findByEmployeeName(employeeName);

    }

    public Task updateTask(Long id, Task updated){

        Task task = repository.findById(id)
                .orElseThrow();

        task.setPlanId(updated.getPlanId());
        task.setEmployeeName(updated.getEmployeeName());
        task.setDepartment(updated.getDepartment());
        task.setTaskDescription(updated.getTaskDescription());
        task.setStatus(updated.getStatus());

        return repository.save(task);

    }

    public void deleteTask(Long id){

        repository.deleteById(id);

    }

}