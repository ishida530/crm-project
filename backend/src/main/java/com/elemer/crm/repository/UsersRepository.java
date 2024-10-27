package com.elemer.crm.repository;


import com.elemer.crm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

}