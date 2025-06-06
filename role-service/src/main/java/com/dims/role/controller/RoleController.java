package com.dims.role.controller;

import com.dims.role.model.Role_Post;
import com.dims.role.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@Tag(name = "Role or Post Management API", description = "APIs for managing Role or Post")
@RestController
@RequestMapping("/role")
@Transactional
public class RoleController {

    @Autowired
    private RoleService roleService;

    @Operation(summary = "Create a new role", description = "Add a new role to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "role created successfully",
                    content = @Content(schema = @Schema(implementation = Role_Post.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request data",
                    content = @Content(schema = @Schema()))
    })
    @PostMapping
    public ResponseEntity<Role_Post> create(@Valid @RequestBody Role_Post rolePost) {
        return new ResponseEntity<>(roleService.create(rolePost), HttpStatus.CREATED);
    }

    @Operation(summary = "Get Role by ID", description = "Retrieve role's details using their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Role found",
                    content = @Content(schema = @Schema(implementation = Role_Post.class))),
            @ApiResponse(responseCode = "404", description = "Role not found",
                    content = @Content(schema = @Schema()))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Role_Post> get(@PathVariable Long id) {
        Role_Post rolePost = roleService.get(id);
            return ResponseEntity.ok(rolePost);
    }

    @Operation(summary = "Get all Role", description = "Retrieve a list of all Role in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Roles retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Role_Post.class)))
    })
    @GetMapping
    public List<Role_Post> getAll() {
        return roleService.getAll();
    }

    @Operation(summary = "Update a role", description = "Update an existing role's details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "role updated successfully",
                    content = @Content(schema = @Schema(implementation = Role_Post.class))),
            @ApiResponse(responseCode = "404", description = "Role not found",
                    content = @Content(schema = @Schema()))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Role_Post> update(@PathVariable Long id, @Valid @RequestBody Role_Post rolePost) {
        return new ResponseEntity<>(roleService.update(id, rolePost), HttpStatus.OK);
    }
    @Operation(summary = "Delete a role", description = "Delete a role from the system using their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "role deleted successfully"),
            @ApiResponse(responseCode = "404", description = "role not found",
                    content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        roleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
