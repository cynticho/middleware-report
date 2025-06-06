package com.dims.employee.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "employee")
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @Size(
            min = 10, max = 10,
            message = "employee's matricule must have exactly 10 characters.")
    private String  matricule;

    @ManyToOne
    @JoinColumn(name = "salary_id", nullable = false)
    private Salary salary;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role_Post role;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person  person;

    @ManyToOne
    @JoinColumn(name = "agency_id", nullable = false)
    private Agency agency;
}
