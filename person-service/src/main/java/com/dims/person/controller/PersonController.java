package com.dims.person.controller;

import com.dims.person.model.Person;
import com.dims.person.service.PersonService;
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
@Tag(name = "Person Management API", description = "APIs for managing Person")
@RestController
@RequestMapping("/person")
@Transactional
public class PersonController {

    @Autowired
    private PersonService personService;

    @Operation(summary = "Create a new person", description = "Add a new person to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "person created successfully",
                    content = @Content(schema = @Schema(implementation = Person.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request data",
                    content = @Content(schema = @Schema()))
    })
    @PostMapping
    public ResponseEntity<Person> create(@Valid @RequestBody Person person) {
        return new ResponseEntity<>(personService.create(person), HttpStatus.CREATED);
    }

    @Operation(summary = "Get Person by ID", description = "Retrieve person's details using their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "person found",
                    content = @Content(schema = @Schema(implementation = Person.class))),
            @ApiResponse(responseCode = "404", description = "person not found",
                    content = @Content(schema = @Schema()))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Person> get(@PathVariable Long id) {
        Person person = personService.get(id);
            return ResponseEntity.ok(person);
    }

    @Operation(summary = "Get all persons", description = "Retrieve a list of all persons in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "person retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Person.class)))
    })
    @GetMapping
    public List<Person> getAll() {
        return personService.getAll();
    }

    @Operation(summary = "Update a person", description = "Update an existing person's details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "person updated successfully",
                    content = @Content(schema = @Schema(implementation = Person.class))),
            @ApiResponse(responseCode = "404", description = "person not found",
                    content = @Content(schema = @Schema()))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Person> update(@PathVariable Long id, @Valid @RequestBody Person person) {
        return new ResponseEntity<>(personService.update(id, person), HttpStatus.OK);
    }
    @Operation(summary = "Delete a person", description = "Delete a person from the system using their ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "person deleted successfully"),
            @ApiResponse(responseCode = "404", description = "person not found",
                    content = @Content(schema = @Schema()))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        personService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
