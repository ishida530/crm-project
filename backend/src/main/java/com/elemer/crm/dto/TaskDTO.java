package com.elemer.crm.dto;
import com.elemer.crm.enums.TaskStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)


public class TaskDTO {
    private String name;
    private String description;
    private TaskStatus status;
    private String author;
    private Date date;
    private Date endDate;
    private Integer project;





    private int statusCode;
    private String error;
    private String message;

}
