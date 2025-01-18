package com.elemer.crm.repository;

import com.elemer.crm.dto.TaskDTO;
import com.elemer.crm.entity.Task;
import com.elemer.crm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    Optional<Task> findById(int id);

    List<Task> findByProjectId(int projectId);

    List<Task> findByStatus(String status);

    List<Task> findByAuthor(User author);

    @Query(value = "SELECT * FROM tasks WHERE start_date < DATE_ADD(NOW(), INTERVAL :minutes MINUTE) AND (notification_sent != 1 OR notification_sent IS NULL)", nativeQuery = true)
    List<Task> findAllStartingWithinMinutes(@Param("minutes") int minutes);

}
