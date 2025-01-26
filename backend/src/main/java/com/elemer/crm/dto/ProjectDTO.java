package com.elemer.crm.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)

public class ProjectDTO {
    private Integer id;
    private String name;
    private Date deadline;
    private String investor_representative;
    private String project_manager;
    private String email;

    private String message;
    private int statusCode;
    private String error;

    private Integer project_template_id;
    private List<TaskDTO> tasks; // Dodajemy listę zadań
    private Integer groupId;

}