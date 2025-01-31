package com.elemer.crm.dto;

import com.elemer.crm.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginRequest {
    private String password;
    private int statusCode;
    private String message;
    private String token;
    private String email;
    private User user;
}