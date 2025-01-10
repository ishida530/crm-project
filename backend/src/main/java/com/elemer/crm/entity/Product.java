package com.elemer.crm.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String producer;
    private String name;
    private Integer quantity;
    private String unit_of_measure;

    @ManyToOne
    @JoinColumn(name = "warehouse_id", nullable = true) // Kolumna może być NULL, gdy magazyn zostaje usunięty
    @JsonBackReference
    private Warehouse warehouse;
}
