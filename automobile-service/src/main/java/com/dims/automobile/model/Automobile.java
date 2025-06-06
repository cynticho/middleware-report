package com.dims.automobile.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "automobile")
public class Automobile implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String immatriculation;

    @Column(unique = true)
    private String code;

    private TypeAuto type = TypeAuto.SIMPLE;

    private Long capacity;

    @ManyToOne
    @JoinColumn(name = "agency_id", nullable = false)
    private Agency agency;
}
