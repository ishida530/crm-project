package com.elemer.crm.repository;

import com.elemer.crm.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    Optional<Task> findById(int id);

    List<Task> findByProjectId(int projectId);

    List<Task> findByStatus(String status);

    List<Task> findByAuthor(String author);
}
