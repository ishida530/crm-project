package com.elemer.crm.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String unitOfMeasure;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    @JsonBackReference
    private Warehouse warehouse;
}
