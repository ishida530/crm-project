package com.elemer.crm.service;

import com.elemer.crm.dto.UserAttendanceDTO;
import com.elemer.crm.dto.UserCreateRequest;
import com.elemer.crm.entity.AttendanceStatus;
import com.elemer.crm.entity.User;
import com.elemer.crm.enums.UserRole;
import com.elemer.crm.repository.AttendanceStatusRepository;
import com.elemer.crm.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceStatusRepository attendanceStatusRepository;
    private final UsersRepository usersRepository;

    // Method to create a new attendance status
    public UserAttendanceDTO createAttendance(UserAttendanceDTO request) {
        // Create a new user with the default role WORKER
        User user = new User();
        user.setName(request.getUserName());
        user.setRole(UserRole.WORKER);  // Default role
        usersRepository.save(user);

        // Iterate through each attendance record and save it
        for (UserAttendanceDTO.AttendanceDateDTO attendance : request.getAttendances()) {
            // Create a new attendance status for each date and status
            AttendanceStatus attendanceStatus = new AttendanceStatus();
            attendanceStatus.setUser(user);
            attendanceStatus.setDate(attendance.getDate());
            attendanceStatus.setStatus(attendance.getStatus());

            // Save the attendance status
            attendanceStatusRepository.save(attendanceStatus);
        }

        // Map and return the result
        return request;
    }


    // Method to update an existing attendance status
    public void updateAttendanceStatus(Integer attendanceStatusId, LocalDate date, String newStatus) {
        // Find the attendance status by ID (using the injected attendanceStatusRepository)
        AttendanceStatus attendanceStatus = attendanceStatusRepository.findById(attendanceStatusId)
                .orElseThrow(() -> new RuntimeException("attendanceStatusId not found for id: " + attendanceStatusId));

        // Convert the newStatus string to the corresponding Enum value
        try {
            AttendanceStatus.Status enumStatus = AttendanceStatus.Status.valueOf(newStatus.toUpperCase());
            attendanceStatus.setStatus(enumStatus);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid attendance status: " + newStatus);
        }

        // Save the updated attendance status
        attendanceStatusRepository.save(attendanceStatus);
    }

    // Method to delete an attendance status by ID
    public void deleteAttendanceStatus(Integer id) {
        // Check if the attendance status exists first
        AttendanceStatus attendanceStatus = attendanceStatusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance status not found for id: " + id));

        // Delete the attendance status by its ID
        attendanceStatusRepository.delete(attendanceStatus);
    }

    // Method to retrieve an attendance status by ID
    public UserAttendanceDTO getAttendanceById(Integer id) {
        // Find the attendance status by ID
        AttendanceStatus status = attendanceStatusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance status not found for id: " + id));

        // Map and return the result
        return mapToUserAttendanceDTO(status);
    }
    public List<UserAttendanceDTO> getStatusesByMonthAndWeek(int month, int weekNumber) {
        // Pobierz statusy obecności tylko dla danego miesiąca i tygodnia
        List<AttendanceStatus> statuses = attendanceStatusRepository.findByMonthAndWeek(month, weekNumber);

        // Grupowanie statusów po użytkowniku
        Map<User, List<AttendanceStatus>> groupedStatuses = statuses.stream()
                .collect(Collectors.groupingBy(AttendanceStatus::getUser));

        // Mapowanie grup na UserAttendanceDTO
        return groupedStatuses.entrySet().stream()
                .map(entry -> {
                    User user = entry.getKey();
                    List<AttendanceStatus> userStatuses = entry.getValue();

                    // Tworzenie DTO dla użytkownika
                    UserAttendanceDTO dto = new UserAttendanceDTO();
                    dto.setUserId(user.getId());
                    dto.setUserName(user.getName());

                    // Mapowanie statusów obecności na DTO
                    List<UserAttendanceDTO.AttendanceDateDTO> attendanceDateDTOs = userStatuses.stream()
                            .map(status -> {
                                UserAttendanceDTO.AttendanceDateDTO dateDTO = new UserAttendanceDTO.AttendanceDateDTO();
                                dateDTO.setDate(status.getDate());
                                dateDTO.setStatus(status.getStatus());
                                return dateDTO;
                            })
                            .collect(Collectors.toList());

                    dto.setAttendances(attendanceDateDTOs);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    // Mapping method to convert AttendanceStatus to UserAttendanceDTO
    private UserAttendanceDTO mapToUserAttendanceDTO(AttendanceStatus status) {
        UserAttendanceDTO dto = new UserAttendanceDTO();
        dto.setUserId(status.getUser().getId());
        dto.setUserName(status.getUser().getName());

        UserAttendanceDTO.AttendanceDateDTO attendanceDateDTO = new UserAttendanceDTO.AttendanceDateDTO();
        attendanceDateDTO.setDate(status.getDate());
        attendanceDateDTO.setStatus(status.getStatus());

        // Initialize the attendances list
        dto.setAttendances(new ArrayList<>(List.of(attendanceDateDTO)));
        return dto;
    }
}
