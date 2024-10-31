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

    private String investorRepresentative;

    private String projectManager;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

//    public static Project fromDTO(ProjectDTO projectRequest) {
//        Project newProject = new Project();
//        newProject.setName(projectRequest.getName());
//        newProject.setProjectManager(projectRequest.getProjectManager());
//        newProject.setDeadline(projectRequest.getDeadline());
//        newProject.setInvestorRepresentative(projectRequest.getInvestorRepresentative());
//        return newProject;
//    }
}
