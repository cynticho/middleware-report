package com.dims.employee.service;

import com.dims.employee.ResourceNotFoundException;
import com.dims.employee.client.AgencyClient;
import com.dims.employee.client.PersonClient;
import com.dims.employee.client.RoleClient;
import com.dims.employee.client.SalaryClient;
import com.dims.employee.model.*;
import com.dims.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AgencyClient agencyClient;

    @Autowired
    private RoleClient roleClient;

    @Autowired
    private SalaryClient salaryClient;

   // @Autowired
   // private PersonClient personClient;

    public Employee create(Employee employee) {
        Agency agency=agencyClient.get(employee.getAgency().getId());
        Role_Post role=roleClient.get(employee.getRole().getId());
        Salary salary=salaryClient.get(employee.getSalary().getIndex());
        employee.setAgency(agency);
        employee.setRole(role);
        employee.setSalary(salary);
        return employeeRepository.save(employee);
    }

    public Boolean exist(Long id) {
        return employeeRepository.existsById(id);
    }

    public Employee get(Long id) {
        return employeeRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException(" Employee with id " + id + " not found"));
    }

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    public Employee update(Long id, Employee employee) {
        if(!employeeRepository.existsById(id)){
            throw new ResourceNotFoundException(" Employee with id " + id + " not found");
        }
        employee.setId(id);
        return employeeRepository.save(employee);
    }

    public void delete(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException(" Employee with id " + id + " not found");
        }
        employeeRepository.deleteById(id);
    }

    public long count(){
        return employeeRepository.count();
    }
}
