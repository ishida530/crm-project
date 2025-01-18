package com.elemer.crm.dto;

import lombok.Data;

@Data
public class ChangePasswordRequestDTO {
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
    private Integer userId;
}
