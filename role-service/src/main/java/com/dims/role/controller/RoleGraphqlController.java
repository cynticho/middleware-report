package com.dims.role.controller;

import com.dims.role.model.Role_Post;
import com.dims.role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class RoleGraphqlController {

    @Autowired
    private RoleService productService;

    @QueryMapping
    public List<Role_Post> getAll() {
        return productService.getAll();
    }

    @QueryMapping
    public Role_Post get(@Argument Long id) {
        return productService.get(id);
    }

    public record WarehouseInput(String name, String location, Long capacity) {}

    @MutationMapping
    public Role_Post create(@Argument Role_Post product ) {
        //ProductDTO role = new ProductDTO();
        //role.setName(warehouseInput.name());
        //role.setCapacity(warehouseInput.capacity());
        //role.setLocation(warehouseInput.location());
        return productService.create(product);
    }

    //@MutationMapping
    //public Product update(@Argument Integer id, @Argument WarehouseInput warehouseInput) {
       // ProductDTO role = new ProductDTO();
        //role.setName(warehouseInput.name());
        //role.setCapacity(warehouseInput.capacity());
        //role.setLocation(warehouseInput.location());
     //   return productService.update(id, role);
   // }

    @MutationMapping
    public Boolean delete(@Argument Long id) {
        productService.delete(id);
        return true;
    }
}
