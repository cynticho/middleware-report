package com.dims.agency.controller;

import com.dims.agency.model.Agency;
import com.dims.agency.service.AgencyService;
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
@Tag(name = "Agency Management API", description = "APIs for managing Agency")
@RestController
@RequestMapping("/agency")
@Transactional
public class AgencyController {

    @Autowired
    private AgencyService agencyService;

    @Operation(summary = "Create a new Agency", description = "Add a new Agency to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agency created successfully",
                    content = @Content(schema = @Schema(implementation = Agency.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request data",
                    content = @Content(schema = @Schema()))
    })
    @PostMapping
    public ResponseEntity<Agency> create(@Valid @RequestBody Agency agency) {
        return new ResponseEntity<>(agencyService.create(agency), HttpStatus.CREATED);
    }

    @Operation(summary = "Get Agency by ID", description = "Retrieve Agency's details using their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agency found",
                    content = @Content(schema = @Schema(implementation = Agency.class))),
            @ApiResponse(responseCode = "404", description = "Agency not found",
                    content = @Content(schema = @Schema()))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Agency> get(@PathVariable Long id) {
        Agency agency = agencyService.get(id);
            return ResponseEntity.ok(agency);
    }

    @Operation(summary = "Get all Agency", description = "Retrieve a list of all Agency in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agency retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Agency.class)))
    })
    @GetMapping
    public List<Agency> getAll() {
        return agencyService.getAll();
    }

    @Operation(summary = "Update an Agency", description = "Update an existing Agency's details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agency updated successfully",
                    content = @Content(schema = @Schema(implementation = Agency.class))),
            @ApiResponse(responseCode = "404", description = "Agency not found",
                    content = @Content(schema = @Schema()))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Agency> update(@PathVariable Long id, @Valid @RequestBody Agency agency) {
        return new ResponseEntity<>(agencyService.update(id, agency), HttpStatus.OK);
    }
    @Operation(summary = "Delete an Agency", description = "Delete an Agency from the system using their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Agency deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Agency not found",
                    content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        agencyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
