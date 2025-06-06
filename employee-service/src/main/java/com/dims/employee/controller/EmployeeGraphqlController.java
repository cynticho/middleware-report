package com.dims.employee.controller;

import com.dims.employee.model.Employee;
import com.dims.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class EmployeeGraphqlController {

    @Autowired
    private EmployeeService productService;

    @QueryMapping
    public List<Employee> getAll() {
        return productService.getAll();
    }

    @QueryMapping
    public Employee get(@Argument Long id) {
        return productService.get(id);
    }

    public record WarehouseInput(String name, String location, Long capacity) {}

    @MutationMapping
    public Employee create(@Argument Employee product ) {
        //ProductDTO employee = new ProductDTO();
        //employee.setName(warehouseInput.name());
        //employee.setCapacity(warehouseInput.capacity());
        //employee.setLocation(warehouseInput.location());
        return productService.create(product);
    }

    //@MutationMapping
    //public Product update(@Argument Integer id, @Argument WarehouseInput warehouseInput) {
       // ProductDTO employee = new ProductDTO();
        //employee.setName(warehouseInput.name());
        //employee.setCapacity(warehouseInput.capacity());
        //employee.setLocation(warehouseInput.location());
     //   return productService.update(id, employee);
   // }

    @MutationMapping
    public Boolean delete(@Argument Long id) {
        productService.delete(id);
        return true;
    }
}
