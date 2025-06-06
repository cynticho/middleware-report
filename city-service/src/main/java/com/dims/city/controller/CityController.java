package com.dims.city.controller;

import com.dims.city.model.City;
import com.dims.city.service.CityService;
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
@Tag(name = "City  Management API", description = "APIs for managing city")
@RestController
@RequestMapping("/city")
@Transactional
public class CityController {

    @Autowired
    private CityService cityService;

    @Operation(summary = "Create a new city", description = "Add a new city to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "city created successfully",
                    content = @Content(schema = @Schema(implementation = City.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request data",
                    content = @Content(schema = @Schema()))
    })
    @PostMapping
    public ResponseEntity<City> create(@Valid @RequestBody City city) {
        return new ResponseEntity<>(cityService.create(city), HttpStatus.CREATED);
    }

    @Operation(summary = "Get City by ID", description = "Retrieve city's details using their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "City found",
                    content = @Content(schema = @Schema(implementation = City.class))),
            @ApiResponse(responseCode = "404", description = "City not found",
                    content = @Content(schema = @Schema()))
    })
    @GetMapping("/{id}")
    public ResponseEntity<City> get(@PathVariable Long id) {
        City city = cityService.get(id);
            return ResponseEntity.ok(city);
    }

    @Operation(summary = "Get all Cities", description = "Retrieve a list of all Cities in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cities retrieved successfully",
                    content = @Content(schema = @Schema(implementation = City.class)))
    })
    @GetMapping
    public List<City> getAll() {
        return cityService.getAll();
    }

    @Operation(summary = "Update a city", description = "Update an existing city's details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "city updated successfully",
                    content = @Content(schema = @Schema(implementation = City.class))),
            @ApiResponse(responseCode = "404", description = "City not found",
                    content = @Content(schema = @Schema()))
    })
    @PutMapping("/{id}")
    public ResponseEntity<City> update(@PathVariable Long id, @Valid @RequestBody City city) {
        return new ResponseEntity<>(cityService.update(id, city), HttpStatus.OK);
    }
    @Operation(summary = "Delete a city", description = "Delete a city from the system using their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "city deleted successfully"),
            @ApiResponse(responseCode = "404", description = "city not found",
                    content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        cityService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
