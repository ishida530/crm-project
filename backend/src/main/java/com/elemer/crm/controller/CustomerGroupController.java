package com.elemer.crm.controller;

import com.elemer.crm.entity.CustomerGroup;
import com.elemer.crm.service.CustomerGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer-group")
public class CustomerGroupController {

    private final CustomerGroupService service;

    @Autowired
    public CustomerGroupController(CustomerGroupService service) {
        this.service = service;
    }

    @GetMapping
    public List<CustomerGroup> getAllGroups() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerGroup> getGroupById(@PathVariable Long id) {
        CustomerGroup group = service.findById(id);
        if (group == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(group);
    }

    @PostMapping
    public CustomerGroup createGroup(@RequestBody CustomerGroup group) {
        return service.save(group);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerGroup> updateGroup(@PathVariable Long id, @RequestBody CustomerGroup group) {
        CustomerGroup existingGroup = service.findById(id);
        if (existingGroup == null) {
            return ResponseEntity.notFound().build();
        }
        existingGroup.setName(group.getName());
        return ResponseEntity.ok(service.save(existingGroup));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
