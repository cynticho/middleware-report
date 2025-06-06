package com.dims.automobile.controller;

import com.dims.automobile.model.Automobile;
import com.dims.automobile.service.AutomobileService;
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


/*
    access to api documentation
    http://localhost:8082/swagger-ui
*/
@CrossOrigin("*")
@Tag(name = "Automobile Management", description = "APIs for managing Automobiles")
@RestController
@RequestMapping("/automobile")
@Transactional
public class AutomobileController {

    @Autowired
    private AutomobileService automobileService;

    @Operation(
            summary = "Create a new Automobile",
            description = "Add a new Automobile to the system")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Automobile created successfully",
                    content = @Content(
                            schema = @Schema(implementation = Automobile.class))),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid request data",
                    content = @Content(schema = @Schema()))
    })
    @PostMapping
    public ResponseEntity<Automobile> create(@Valid @RequestBody Automobile automobile) {
        return new ResponseEntity<>
                (automobileService.create(automobile), HttpStatus.CREATED);
    }

    @Operation(
            summary = "Get Automobile by ID",
            description = "Retrieve Automobile's details using their ID")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Automobile found",
                    content = @Content(schema = @Schema(implementation = Automobile.class))),
            @ApiResponse(responseCode = "404", description = "Category not found",
                    content = @Content(schema = @Schema()))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Automobile> get(@PathVariable Long id) {
        Automobile category = automobileService.get(id);
            return ResponseEntity.ok(category);
    }



    @Operation(
            summary = "Get all Automobile",
            description = "Retrieve a list of all Automobiles in the system")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Automobile retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Automobile.class)))
    })
    @GetMapping
    public List<Automobile> getAll() {
        return automobileService.getAll();
    }

    @Operation(
            summary = "Get Automobile's number",
            description = "count all the stored Automobiles")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Automobile count successfully",
                    content = @Content(schema = @Schema(implementation = Automobile.class))),
            @ApiResponse(responseCode = "404", description = "error while counted Automobiles",
                    content = @Content(schema = @Schema()))
    })
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(automobileService.count());
    }

    @Operation(
            summary = "Update a Automobile",
            description = "Update an existing Automobile's details")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Automobile updated successfully",
                    content = @Content(schema = @Schema(implementation = Automobile.class))),
            @ApiResponse(responseCode = "404", description = "Automobile not found",
                    content = @Content(schema = @Schema()))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Automobile> update(
            @PathVariable Long id, @Valid @RequestBody Automobile automobile) {
        return new ResponseEntity<>(automobileService.update(id, automobile), HttpStatus.OK);
    }

    @Operation(
            summary = "Delete a Automobile",
            description = "Delete a Automobile from the system using their ID")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "Automobile deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Automobile not found",
                    content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        automobileService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
