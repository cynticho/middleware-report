package com.dims.employee.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "salary")
@AllArgsConstructor
@NoArgsConstructor
public class Salary {
    @Id
    private Long index;

    @Column(unique = true)
    @NotNull(message = "Base salary can't be null")
    private Long base;

    private Long total;
}
