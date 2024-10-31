package com.elemer.crm.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)

public class ProjectDTO {

    private String name;
    private Date deadline;
    private String investorRepresentative;
    private String projectManager;
    private String email;

    private String message;
    private int statusCode;
    private String error;
}