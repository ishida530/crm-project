package com.elemer.crm.dto;

import com.elemer.crm.entity.AttendanceStatus;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class UserAttendanceDTO {

    private Integer userId;
    private String userName;
    private List<AttendanceDateDTO> attendances;  // Lista z datami i statusami

    @Data
    public static class AttendanceDateDTO {
        private Integer attendanceId;  // Dodanie ID obecności
        private LocalDate date;
        private AttendanceStatus.Status status;  // Enum statusu obecności
    }
}
