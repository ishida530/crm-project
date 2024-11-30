package com.elemer.crm.repository;

import com.elemer.crm.entity.CustomerGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerGroupRepository extends JpaRepository<CustomerGroup, Long> {
}
