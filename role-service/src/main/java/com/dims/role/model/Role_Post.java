package com.dims.role.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "role_post")
@AllArgsConstructor
@NoArgsConstructor
public class Role_Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @Size(
            min = 3, max = 15,
            message = "role label's must have a length between 3 and 15 characters.")
    private String  label;

    private String description;
}
