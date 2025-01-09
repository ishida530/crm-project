package com.elemer.crm.controller;

import com.elemer.crm.dto.AttendanceDTO;
import com.elemer.crm.dto.UserCreateRequest;
import com.elemer.crm.entity.Attendance;
import com.elemer.crm.entity.AttendanceStatus;
import com.elemer.crm.entity.User;
import com.elemer.crm.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendances")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping
    public ResponseEntity<List<AttendanceDTO>> getAllAttendances() {
        return ResponseEntity.ok(attendanceService.getAllAttendances());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable Integer id) {
        return ResponseEntity.ok(attendanceService.getAttendanceById(id));
    }

    @PostMapping
    public ResponseEntity<User> createAttendance(@RequestBody UserCreateRequest userCreateRequest) {
        // Zdobądź dane z requestu
        String name = userCreateRequest.getName();
        LocalDate date = userCreateRequest.getDate();
        AttendanceStatus.Status status = userCreateRequest.getStatus();

        User user = attendanceService.createUser(name, userCreateRequest.getRole(), date, status);

        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Integer id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/absences")
    public ResponseEntity<List<AttendanceStatus>> getAbsences(@PathVariable Integer id) {
        return ResponseEntity.ok(attendanceService.getAbsentStatuses(id));
    }

    @GetMapping("/statuses")
    public ResponseEntity<List<AttendanceDTO>> getStatusesByMonthAndWeek(
            @RequestParam int month,
            @RequestParam int weekNumber) {

        List<AttendanceDTO> attendanceDTOList = attendanceService.getStatusesByMonthAndWeek(month, weekNumber);

        return ResponseEntity.ok(attendanceDTOList);
    }

}