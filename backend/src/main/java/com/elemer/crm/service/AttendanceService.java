package com.elemer.crm.service;

import com.elemer.crm.dto.AttendanceDTO;
import com.elemer.crm.entity.Attendance;
import com.elemer.crm.entity.AttendanceStatus;
import com.elemer.crm.entity.User;
import com.elemer.crm.enums.UserRole;
import com.elemer.crm.repository.AttendanceRepository;
import com.elemer.crm.repository.AttendanceStatusRepository;
import com.elemer.crm.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final AttendanceStatusRepository attendanceStatusRepository;
    private final UsersRepository usersRepository;

    // Metoda do pobierania wszystkich pracowników
    public List<AttendanceDTO> getAllAttendances() {
        // Pobierz użytkowników o roli WORKER
        List<User> workers = usersRepository.findByRole(UserRole.WORKER);

        // Przekształć obecności na DTO
        return workers.stream()
                .flatMap(user -> user.getAttendances().stream())  // Spłaszczamy listę obecności
                .map(attendance -> {
                    // Tworzymy DTO dla obecności
                    AttendanceDTO attendanceDTO = new AttendanceDTO();
                    attendanceDTO.setId(attendance.getId());
                    attendanceDTO.setUserName(attendance.getUser().getName());  // Ustawiamy tylko imię użytkownika

                    // Tworzymy listę statusów obecności
                    List<AttendanceDTO.AttendanceStatusDTO> statusDTOs = attendance.getAttendanceStatuses().stream()
                            .map(status -> {
                                AttendanceDTO.AttendanceStatusDTO statusDTO = new AttendanceDTO.AttendanceStatusDTO();
                                statusDTO.setId(status.getId());
                                statusDTO.setDate(status.getDate());
                                statusDTO.setStatus(status.getStatus());
                                return statusDTO;
                            })
                            .collect(Collectors.toList());

                    attendanceDTO.setAttendanceStatuses(statusDTOs);
                    return attendanceDTO;
                })
                .collect(Collectors.toList());
    }

    // Metoda do pobierania pracownika po ID
    public Attendance getAttendanceById(Integer id) {
        Optional<Attendance> attendance = attendanceRepository.findById(id);
        return attendance.orElseThrow(() -> new RuntimeException("Attendance not found for id: " + id));
    }
    // Method to create a user with name and role
    public User createUser(String name, UserRole role, LocalDate date, AttendanceStatus.Status status) {
        // Tworzymy użytkownika
        User user = new User();
        user.setName(name);
        user.setRole(role);
        usersRepository.save(user);  // Zapisujemy użytkownika do bazy danych

        // Tworzymy nową obecność (Attendance) dla użytkownika
        Attendance attendance = new Attendance();
        attendance.setUser(user);  // Powiązanie obecności z użytkownikiem
        attendanceRepository.save(attendance);  // Zapisujemy obecność

        // Tworzymy status obecności (AttendanceStatus) dla danego dnia
        AttendanceStatus attendanceStatus = new AttendanceStatus();
        attendanceStatus.setAttendance(attendance);  // Powiązanie statusu z obecnością
        attendanceStatus.setDate(date);  // Ustawienie daty obecności
        attendanceStatus.setStatus(status);  // Ustawienie statusu

        // Zapisujemy status obecności
        System.out.println(attendanceStatus);
        attendanceStatusRepository.save(attendanceStatus);

        return user;  // Zwracamy utworzonego użytkownika
    }
    // Metoda do zapisywania obecności pracownika
    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    // Metoda do usuwania obecności pracownika
    public void deleteAttendance(Integer id) {
        attendanceRepository.deleteById(id);
    }

    // Metoda do pobierania statusów obecności dla pracownika (np. L4, URL)
    public List<AttendanceStatus> getAbsentStatuses(Integer id) {
        return attendanceStatusRepository.findByAttendanceId(id);
    }

    public List<AttendanceDTO> getStatusesByMonthAndWeek(int month, int weekNumber) {
        // Pobierz statusy obecności tylko dla danego miesiąca i tygodnia
        List<AttendanceStatus> statuses = attendanceStatusRepository.findByMonthAndWeek(month, weekNumber);

        // Grupowanie statusów po Attendance
        Map<Attendance, List<AttendanceStatus>> groupedStatuses = statuses.stream()
                .collect(Collectors.groupingBy(AttendanceStatus::getAttendance));

        // Mapowanie grup na AttendanceDTO
        return groupedStatuses.entrySet().stream()
                .map(entry -> {
                    Attendance attendance = entry.getKey();
                    List<AttendanceStatus> attendanceStatuses = entry.getValue();

                    // Tworzenie DTO dla pracownika
                    AttendanceDTO dto = new AttendanceDTO();
                    dto.setId(attendance.getId());
                    dto.setUserName(attendance.getUser().getName());  // Ustawiamy tylko imię użytkownika

                    // Mapowanie statusów obecności na DTO
                    List<AttendanceDTO.AttendanceStatusDTO> statusDTOs = attendanceStatuses.stream()
                            .map(status -> {
                                AttendanceDTO.AttendanceStatusDTO statusDTO = new AttendanceDTO.AttendanceStatusDTO();
                                statusDTO.setId(status.getId());
                                statusDTO.setDate(status.getDate());
                                statusDTO.setStatus(status.getStatus());
                                return statusDTO;
                            })
                            .collect(Collectors.toList());

                    dto.setAttendanceStatuses(statusDTOs);
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
