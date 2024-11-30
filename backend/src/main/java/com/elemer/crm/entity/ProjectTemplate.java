package com.elemer.crm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(length = 1000)
    private String description;

    @OneToMany(mappedBy = "projectTemplate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;
}
