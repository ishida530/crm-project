package com.elemer.crm.controller;

import com.elemer.crm.dto.UserAttendanceDTO;
import com.elemer.crm.dto.UserCreateRequest;
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

    // Endpoint to get the attendance status by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserAttendanceDTO> getAttendanceById(@PathVariable Integer id) {
        return ResponseEntity.ok(attendanceService.getAttendanceById(id));  // Get attendance status by ID
    }

    // Endpoint to create a new attendance status and a worker user
    @PostMapping
    public ResponseEntity<UserAttendanceDTO> createAttendanceStatus(@RequestBody UserAttendanceDTO userCreateRequest) {
        System.out.println(userCreateRequest);
        UserAttendanceDTO userAttendanceDTO = attendanceService.createOrUpdateAttendance(userCreateRequest);  // Call service to create attendance
        return ResponseEntity.ok(userAttendanceDTO);  // Return the attendance status as DTO
    }

    // Endpoint to update the attendance status for a specific user
    @PutMapping("/{userId}")
    public ResponseEntity<Void> updateAttendanceStatus(
            @PathVariable Integer userId,
            @RequestParam String newStatus) {
        attendanceService.updateAttendanceStatus(userId, newStatus);  // Update attendance status via service
        return ResponseEntity.noContent().build();  // Return a 204 No Content response
    }

    // Endpoint to delete the attendance status by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendanceStatus(@PathVariable Integer id) {
        attendanceService.deleteAttendanceStatus(id);  // Delete attendance status by ID
        return ResponseEntity.noContent().build();  // Return a 204 No Content response
    }

    // Endpoint to get attendance statuses for a specific month and week
    @GetMapping("/statuses")
    public ResponseEntity<List<UserAttendanceDTO>> getStatusesByMonthAndWeek(
            @RequestParam int month,
            @RequestParam int weekNumber) {
        return ResponseEntity.ok(attendanceService.getStatusesByMonthAndWeek(month, weekNumber));  // Get statuses for a specific month and week
    }
}
