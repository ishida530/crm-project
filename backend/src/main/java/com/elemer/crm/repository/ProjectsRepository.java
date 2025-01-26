package com.elemer.crm.repository;


import com.elemer.crm.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProjectsRepository extends JpaRepository<Project, Integer> {


    Optional<Project> findById(int id);


    @Query(value = "SELECT * FROM projects WHERE archived = 1", nativeQuery = true)
    List<Project> getAllArchived();

    @Query(value = "SELECT * FROM projects WHERE archived != 1", nativeQuery = true)
    List<Project> getAllUnArchived();
}