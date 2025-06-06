package com.dims.salary.controller;

import com.dims.salary.model.Salary;
import com.dims.salary.service.SalaryService;
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
@Tag(name = "Salary Management API", description = "APIs for managing Salary")
@RestController
@RequestMapping("/salary")
@Transactional
public class SalaryController {

    @Autowired
    private SalaryService salaryService;

    @Operation(summary = "Create a new salary", description = "Add a new salary to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "salary created successfully",
                    content = @Content(schema = @Schema(implementation = Salary.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request data",
                    content = @Content(schema = @Schema()))
    })
    @PostMapping
    public ResponseEntity<Salary> create(@Valid @RequestBody Salary salary) {
        return new ResponseEntity<>(salaryService.create(salary), HttpStatus.CREATED);
    }

    @Operation(summary = "Get Salary by ID", description = "Retrieve salary's details using their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Salary found",
                    content = @Content(schema = @Schema(implementation = Salary.class))),
            @ApiResponse(responseCode = "404", description = "Salary not found",
                    content = @Content(schema = @Schema()))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Salary> get(@PathVariable Long id) {
        Salary salary = salaryService.get(id);
            return ResponseEntity.ok(salary);
    }

    @Operation(summary = "Get all Salaries", description = "Retrieve a list of all salaries in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Salary retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Salary.class)))
    })
    @GetMapping
    public List<Salary> getAll() {
        return salaryService.getAll();
    }

    @Operation(summary = "Update a salary", description = "Update an existing salary's details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "salary updated successfully",
                    content = @Content(schema = @Schema(implementation = Salary.class))),
            @ApiResponse(responseCode = "404", description = "Salary not found",
                    content = @Content(schema = @Schema()))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Salary> update(@PathVariable Long id, @Valid @RequestBody Salary salary) {
        return new ResponseEntity<>(salaryService.update(id, salary), HttpStatus.OK);
    }
    @Operation(summary = "Delete a salary", description = "Delete a salary from the system using their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "salary deleted successfully"),
            @ApiResponse(responseCode = "404", description = "salary not found",
                    content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        salaryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
