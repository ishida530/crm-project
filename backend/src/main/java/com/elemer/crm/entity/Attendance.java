package com.elemer.crm.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "attendances")
@Data
@NoArgsConstructor
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy = "attendance", cascade = CascadeType.ALL)
    @JsonManagedReference
    @ToString.Exclude
    private List<AttendanceStatus> attendanceStatuses;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // Powiązanie z tabelą User
}
