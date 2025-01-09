package com.elemer.crm.dto;

import com.elemer.crm.entity.AttendanceStatus;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AttendanceDTO {

    private Integer id;  // Identyfikator obecności
    private String userName;  // Imię użytkownika
    private List<AttendanceStatusDTO> attendanceStatuses;  // Lista statusów obecności

    @Data
    public static class AttendanceStatusDTO {
        private Integer id;  // Identyfikator statusu obecności
        private LocalDate date;  // Data obecności
        private AttendanceStatus.Status status;  // Status obecności (np. PRESENT, ABSENT)
    }
}
