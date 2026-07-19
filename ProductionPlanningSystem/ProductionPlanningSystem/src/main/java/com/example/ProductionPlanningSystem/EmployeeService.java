package com.example.ProductionPlanningSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public Employee addEmployee(Employee employee){
        return repository.save(employee);
    }

    public List<Employee> getEmployees(){
        return repository.findAll();
    }

    public Employee updateEmployee(Long id, Employee updated){

        Employee employee = repository.findById(id)
                .orElseThrow();

        employee.setEmployeeName(updated.getEmployeeName());
        employee.setDepartment(updated.getDepartment());
        employee.setDesignation(updated.getDesignation());
        employee.setEmail(updated.getEmail());
        employee.setPhone(updated.getPhone());

        return repository.save(employee);
    }

    public void deleteEmployee(Long id){
        repository.deleteById(id);
    }

}
