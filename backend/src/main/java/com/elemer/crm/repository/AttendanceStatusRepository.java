package com.elemer.crm.repository;

import com.elemer.crm.entity.AttendanceStatus;
import com.elemer.crm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceStatusRepository extends JpaRepository<AttendanceStatus, Integer> {
    List<AttendanceStatus> findByUserId(Integer userId);
    Optional<AttendanceStatus> findById(Integer id);

    @Query("SELECT a FROM AttendanceStatus a WHERE MONTH(a.date) = :month AND WEEK(a.date) = :weekNumber")
    List<AttendanceStatus> findByMonthAndWeek(@Param("month") int month, @Param("weekNumber") int weekNumber);
    boolean existsByUserId(Integer userId);

    Optional<AttendanceStatus> findByUserAndDate(User user, LocalDate date);
}
