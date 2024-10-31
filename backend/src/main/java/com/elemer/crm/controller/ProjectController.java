package com.elemer.crm.controller;

import com.elemer.crm.dto.HttpResponse;
import com.elemer.crm.dto.ProjectDTO;
import com.elemer.crm.service.ProjectsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/projects")
public class ProjectController {

    @Autowired
    private ProjectsService projectsService;

    @GetMapping("")
    public ResponseEntity<HttpResponse> getAllProjects() {
        return ResponseEntity.ok(projectsService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HttpResponse> getProjectById(@PathVariable Integer id) {
        return ResponseEntity.ok(projectsService.getProjectById(id));
    }

    @PostMapping("")
    public ResponseEntity<HttpResponse> addProject(@RequestBody ProjectDTO projectRequest) {
        HttpResponse response = projectsService.addProject(projectRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpResponse> updateProject(@PathVariable Integer id, @RequestBody ProjectDTO projectRequest) {
        HttpResponse response = projectsService.updateProject(id, projectRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpResponse> deleteProject(@PathVariable Integer id) {
        HttpResponse response = projectsService.deleteProject(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
