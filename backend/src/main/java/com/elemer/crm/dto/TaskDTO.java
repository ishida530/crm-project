package com.elemer.crm.dto;

import com.elemer.crm.entity.User;
import com.elemer.crm.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.type.DateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor // Konstruktor bezargumentowy
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TaskDTO {
    private Integer id;
    private String name;
    private String description;
    private TaskStatus status;
    private Integer author;
    private String author_name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp start_date;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp end_date;

    private Integer project;
    private Integer project_template_id;

    private int statusCode;
    private String error;
    private String message;

    public TaskDTO(Integer id, String name,TaskStatus status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
}
