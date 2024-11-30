package com.elemer.crm.controller;

import com.elemer.crm.dto.ProjectTemplateDTO;
import com.elemer.crm.service.ProjectTemplateService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project/templates")
public class ProjectTemplateController {

    @Autowired
    private ProjectTemplateService projectTemplateService;

    @GetMapping
    public ResponseEntity<List<ProjectTemplateDTO>> getAllProjectTemplates() {
        return ResponseEntity.ok(projectTemplateService.getAllProjectTemplates());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectTemplateDTO> getProjectTemplateById(@PathVariable Integer id) {
        return ResponseEntity.ok(projectTemplateService.getProjectTemplateById(id));
    }
    @PostMapping
    public ResponseEntity<ProjectTemplateDTO> createProjectTemplate(@Valid @RequestBody ProjectTemplateDTO projectTemplateDTO) {
        return ResponseEntity.ok(projectTemplateService.createProjectTemplate(projectTemplateDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectTemplateDTO> updateProjectTemplate(@PathVariable Integer id, @Valid @RequestBody ProjectTemplateDTO projectTemplateDTO) {
        return ResponseEntity.ok(projectTemplateService.updateProjectTemplate(id, projectTemplateDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjectTemplate(@PathVariable Integer id) {
        projectTemplateService.deleteProjectTemplate(id);
        return ResponseEntity.noContent().build();
    }
}
