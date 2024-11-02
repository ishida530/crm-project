package com.elemer.crm.dto;

import com.elemer.crm.entity.Project;
import com.elemer.crm.entity.User;
import com.elemer.crm.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class HttpResponse {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String phoneNumber;
    private UserRole role;
    private String email;
    private User user;
    private List<User> userList;
    private List<Project> projects;
    private Project project;

}
