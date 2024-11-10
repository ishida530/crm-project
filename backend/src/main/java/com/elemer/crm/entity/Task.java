package com.elemer.crm.entity;

import com.elemer.crm.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "tasks")
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String name;

    @NotNull
    private String description;

    @ManyToOne(optional = true)
    @JoinColumn(name = "project_id")
    @JsonIgnore
    private Project project;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private String author;
    private Date date;

}
