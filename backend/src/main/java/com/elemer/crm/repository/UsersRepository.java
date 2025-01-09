package com.elemer.crm.repository;


import com.elemer.crm.entity.User;
import com.elemer.crm.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);


    List<User> findByRole(UserRole role);
}