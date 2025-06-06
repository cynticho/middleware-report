package com.dims.employee.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "person")
@AllArgsConstructor
@NoArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @Size(
            min = 3, max = 50,
            message = "person name's must have a length between 3 and 50 characters.")
    private String  name;

    @Column(unique = true)
    @Email(message = "the given email is incorrect")
    private String email;

    @Column(unique = true)
    @Size(
            min = 9, max = 9,
            message = "person phone's number must have exactly 9 characters.")
    private String  phone;

    @Column(unique = true)
    @Size(
            min = 9, max = 9,
            message = "person nic's number must have exactly 9 characters.")
    private String  nic;

    @Column(nullable = false)
    private Sex sex;
}
