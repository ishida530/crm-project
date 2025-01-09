package com.elemer.crm.dto;

import com.elemer.crm.enums.UserRole;
import com.elemer.crm.entity.AttendanceStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserCreateRequest {
    private String name;
    private UserRole role;
    private LocalDate date;  // Data obecności
    private AttendanceStatus.Status status;  // Status obecności (np. PRESENT, VACATION)
}
