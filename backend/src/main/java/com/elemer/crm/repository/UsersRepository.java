package com.elemer.crm.repository;


import com.elemer.crm.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<OurUsers, Integer> {

    Optional<OurUsers> findByEmail(String email);

}