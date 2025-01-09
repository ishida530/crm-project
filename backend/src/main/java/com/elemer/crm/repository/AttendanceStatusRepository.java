package com.elemer.crm.repository;

import com.elemer.crm.entity.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttendanceStatusRepository extends JpaRepository<AttendanceStatus, Integer> {
    List<AttendanceStatus> findByAttendanceId(Integer attendanceId);  // Metoda do pobierania statusów dla danego pracownika

    @Query(value = "SELECT * FROM attendance_statuses " +
            "WHERE MONTH(date) = :month " +
            "AND CEIL(DAY(date)/7.0) = :weekNumber",
            nativeQuery = true)
    List<AttendanceStatus> findByMonthAndWeek(@Param("month") Integer month,
                                              @Param("weekNumber") Integer weekNumber);

}
