package com.elemer.crm.service;

import com.elemer.crm.entity.CustomerGroup;
import com.elemer.crm.repository.CustomerGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerGroupService {

    private final CustomerGroupRepository repository;

    @Autowired
    public CustomerGroupService(CustomerGroupRepository repository) {
        this.repository = repository;
    }

    public List<CustomerGroup> findAll() {
        return repository.findAll();
    }

    public CustomerGroup save(CustomerGroup group) {
        return repository.save(group);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public CustomerGroup findById(Long id) {
        return repository.findById(id).orElse(null);
    }
}
