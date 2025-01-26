package com.elemer.crm.entity;

import com.elemer.crm.dto.ProjectDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "projects")
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "Project name cannot be null")
    private String name;

    @Temporal(TemporalType.DATE)
    private Date deadline;

    private String investor_representative;

    private String project_manager;

    @Column(columnDefinition = "int default 0")
    private Integer archived = 0;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = true) // Opcjonalna grupa projektów
    private ProjectGroup group;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Task> tasks;

    @Override
    public String toString() {
        return "Project{id=" + id + ", name='" + name + "'}";
    }


    @PrePersist
    private void setDefaultArchived() {
        if (archived == null) {
            archived = 0;
        }
    }
}
