package com.elemer.crm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "project_groups")
@Data
public class ProjectGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Group name cannot be null")
    private String name;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Project> projects;

    @ManyToOne
    @JoinColumn(name = "project_template_id")
    private ProjectTemplate projectTemplate;

    @Override
    public String toString() {
        return "ProjectGroup{id=" + id + ", name='" + name + "'}";
    }
}
