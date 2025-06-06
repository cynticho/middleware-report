package com.dims.automobile.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "agency")
@AllArgsConstructor
@NoArgsConstructor
public class Agency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @Size(
            min = 3, max = 15,
            message = "agency label's must have a length between 3 and 15 characters.")
    private String  label;

    private String description;

    @ManyToOne()
    @JoinColumn(name = "city_id", nullable = false)
    private City city;
}
