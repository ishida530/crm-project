package com.elemer.crm.repository;


import com.elemer.crm.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectsRepository extends JpaRepository<Project, Integer> {


    Optional<Project> findById(int id);

    Optional<Project> findByTemplate(int id);

}