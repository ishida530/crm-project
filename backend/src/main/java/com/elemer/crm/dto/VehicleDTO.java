package com.elemer.crm.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class VehicleDTO {

    @NotNull
    private String brand;

    @NotNull
    private String model;

    private LocalDate inspectionDate;

    private LocalDate insuranceDate;

    private LocalDate udtDate;

    private Integer technicalInspection;

    private String driver;

    private String owner;

    private String vin;

    private String engine;

    private Integer year;

}
