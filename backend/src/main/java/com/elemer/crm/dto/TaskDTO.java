package com.elemer.crm.dto;

import com.elemer.crm.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Integer author;  // ID autora
    private String authorName; // Nowe pole na nazwisko autora
    private Date startDate;
    private Date endDate;
    private Integer project;
    private Integer projectTemplateId;

    private int statusCode;
    private String error;
    private String message;
}
