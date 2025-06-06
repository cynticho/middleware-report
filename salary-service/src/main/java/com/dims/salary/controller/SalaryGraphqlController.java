package com.dims.salary.controller;

import com.dims.salary.model.Salary;
import com.dims.salary.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class SalaryGraphqlController {

    @Autowired
    private SalaryService productService;

    @QueryMapping
    public List<Salary> getAll() {
        return productService.getAll();
    }

    @QueryMapping
    public Salary get(@Argument Long id) {
        return productService.get(id);
    }

    public record WarehouseInput(String name, String location, Long capacity) {}

    @MutationMapping
    public Salary create(@Argument Salary product ) {
        //ProductDTO salary = new ProductDTO();
        //salary.setName(warehouseInput.name());
        //salary.setCapacity(warehouseInput.capacity());
        //salary.setLocation(warehouseInput.location());
        return productService.create(product);
    }

    //@MutationMapping
    //public Product update(@Argument Integer id, @Argument WarehouseInput warehouseInput) {
       // ProductDTO salary = new ProductDTO();
        //salary.setName(warehouseInput.name());
        //salary.setCapacity(warehouseInput.capacity());
        //salary.setLocation(warehouseInput.location());
     //   return productService.update(id, salary);
   // }

    @MutationMapping
    public Boolean delete(@Argument Long id) {
        productService.delete(id);
        return true;
    }
}
