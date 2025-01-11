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

    public UserAttendanceDTO createOrUpdateAttendance(UserAttendanceDTO request) {
        User user;
        // Sprawdź, czy userId jest podane i spróbuj znaleźć użytkownika
        if (request.getUserId() != null) {
            user = usersRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found for user ID: " + request.getUserId()));
        } else {
            // Jeśli userId jest null, utwórz nowego użytkownika
            if (request.getUserName() == null || request.getUserName().isEmpty()) {
                throw new RuntimeException("User name must be provided when user ID is not specified.");
            }
            user = new User();
            user.setName(request.getUserName());
            user.setRole(UserRole.WORKER); // Domyślna rola
            usersRepository.save(user);
        }

        // Iteruj przez listę obecności i zapisuj/aktualizuj dane
        for (UserAttendanceDTO.AttendanceDateDTO attendanceDTO : request.getAttendances()) {
            AttendanceStatus attendanceStatus;

            // Jeśli ID obecności jest podane, zaktualizuj istniejący rekord
            if (attendanceDTO.getAttendanceId() != null) {
                attendanceStatus = attendanceStatusRepository.findById(attendanceDTO.getAttendanceId())
                        .orElseThrow(() -> new RuntimeException("Attendance record not found for ID: " + attendanceDTO.getAttendanceId()));
                attendanceStatus.setDate(attendanceDTO.getDate());
                attendanceStatus.setStatus(attendanceDTO.getStatus());
            } else {
                // Jeśli ID obecności nie ma, stwórz nowy rekord
                attendanceStatus = new AttendanceStatus();
                attendanceStatus.setUser(user);
                attendanceStatus.setDate(attendanceDTO.getDate());
                attendanceStatus.setStatus(attendanceDTO.getStatus());

            }

            System.out.println(attendanceStatus);

            // Zapisz rekord obecności
            attendanceStatusRepository.save(attendanceStatus);
            System.out.println("zapisany "+ attendanceStatus);

        }

        // Zwróć oryginalny request jako odpowiedź
        return request;
    }

    // Method to update an existing attendance status
    public AttendanceStatus updateAttendanceStatus(Integer id, String newStatus) {
        // Find the attendance status by user ID
        AttendanceStatus attendanceStatus = attendanceStatusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance status not found for user ID: " + id));

        // Convert the newStatus string to the corresponding Enum value
        try {
            AttendanceStatus.Status enumStatus = AttendanceStatus.Status.valueOf(newStatus.toUpperCase());
            attendanceStatus.setStatus(enumStatus);  // Update the status
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid attendance status: " + newStatus);
        }

        // Save and return the updated attendance status
        return attendanceStatusRepository.save(attendanceStatus);
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
                                dateDTO.setAttendanceId(status.getId());  // Dodajemy attendanceId
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
