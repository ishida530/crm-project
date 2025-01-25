package com.elemer.crm.controller;

import com.elemer.crm.dto.ProjectGroupDTO;
import com.elemer.crm.service.ProjectGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project-groups")
public class ProjectGroupController {

    @Autowired
    private ProjectGroupService projectGroupService;

    @GetMapping
    public List<ProjectGroupDTO> getAllGroups() {
        return projectGroupService.getAllGroups();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectGroupDTO> getGroupById(@PathVariable int id) {
        ProjectGroupDTO group = projectGroupService.getGroupById(id);
        return ResponseEntity.ok(group);
    }

    @PostMapping
    public ResponseEntity<ProjectGroupDTO> createGroup(@RequestBody ProjectGroupDTO groupDTO) {
        ProjectGroupDTO createdGroup = projectGroupService.createGroup(groupDTO);
        return ResponseEntity.status(201).body(createdGroup);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectGroupDTO> updateGroup(@PathVariable int id, @RequestBody ProjectGroupDTO groupDTO) {
        ProjectGroupDTO updatedGroup = projectGroupService.updateGroup(id, groupDTO);
        return ResponseEntity.ok(updatedGroup);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable int id) {
        projectGroupService.deleteGroup(id);
        return ResponseEntity.noContent().build();
    }
}
