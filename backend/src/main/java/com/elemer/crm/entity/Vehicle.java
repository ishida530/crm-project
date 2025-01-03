package com.elemer.crm.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "vehicles")
@Data
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String brand;
    private String model;

    private LocalDate inspectionDate;
    private LocalDate insuranceDate;

    private Integer technicalInspection;

    private String driver;
    private String owner;
    private String vin;

    private String engine;
    private Integer year;
}
