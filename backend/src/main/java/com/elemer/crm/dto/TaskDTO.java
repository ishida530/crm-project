package com.elemer.crm.dto;

import com.elemer.crm.entity.User;
import com.elemer.crm.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class TaskDTO {
    private Integer id;
    private String name;
    private String description;
    private TaskStatus status;
    private Integer author;
    private Date startDate;
    private Date endDate;
    private Integer project;
    private Integer projectTemplateId;

    private int statusCode;
    private String error;
    private String message;
}
