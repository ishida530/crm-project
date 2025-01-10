package com.elemer.crm.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.time.LocalDate;

@Entity
@Table(name = "attendance_statuses")
@Data
@NoArgsConstructor
public class AttendanceStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  // Powiązanie z tabelą User
    private User user;

    private LocalDate date;  // Data obecności

    @Enumerated(EnumType.STRING)
    private Status status;  // Status obecności

    public enum Status {
        PRESENT,        // Employee is present
        VACATION,       // Paid vacation
        SICK_LEAVE,     // Sick leave
        BEREAVEMENT,    // Bereavement leave
        ABSENT          // Employee is absent
    }
}
