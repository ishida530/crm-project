package com.elemer.crm.entity;

import com.elemer.crm.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnore
    private Project project;

    @ManyToOne
    @JoinColumn(name = "project_template_id")
    @JsonIgnore
    private ProjectTemplate projectTemplate;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonProperty("author")
    private User author;

    private Date startDate;
    private Date endDate;

    @JsonIgnore
    private Integer notificationSent;

    @Override
    public String toString() {
        return "Task{id=" + id + ", name='" + name + "', description='" + description + "', status=" + status + "}";
    }
}
