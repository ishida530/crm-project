package com.elemer.crm.service;

import com.elemer.crm.dto.ProjectTemplateDTO;
import com.elemer.crm.dto.TaskDTO;
import com.elemer.crm.entity.ProjectTemplate;
import com.elemer.crm.repository.ProjectTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectTemplateService {

    @Autowired
    private ProjectTemplateRepository projectTemplateRepository;

    public List<ProjectTemplateDTO> getAllProjectTemplates() {
        return projectTemplateRepository.findAll().stream()
                .map(template -> new ProjectTemplateDTO(
                        template.getId(),
                        template.getName(),
                        template.getDescription(),
                        template.getTasks().stream()
                                .map(task -> new TaskDTO(
                                        task.getId(),
                                        task.getName(),
                                        task.getDescription(),
                                        task.getStatus(),
                                        task.getAuthor() != null ? task.getAuthor().getId() : null,
                                        task.getAuthor() != null ? task.getAuthor().getName() : null,  // Dodano authorName
                                        task.getStart_date(),
                                        task.getEnd_date(),
                                        task.getProject() != null ? task.getProject().getId() : null,
                                        task.getProjectTemplate() != null ? task.getProjectTemplate().getId() : null,
                                        0,  // statusCode
                                        "",  // error
                                        ""   // message
                                ))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    public ProjectTemplateDTO getProjectTemplateById(Integer id) {
        ProjectTemplate projectTemplate = projectTemplateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project Template not found"));

        ProjectTemplateDTO projectTemplateDTO = new ProjectTemplateDTO(
                projectTemplate.getId(),
                projectTemplate.getName(),
                projectTemplate.getDescription(),
                projectTemplate.getTasks() != null ? projectTemplate.getTasks().stream()
                        .map(task -> new TaskDTO(
                                task.getId(),
                                task.getName(),
                                task.getDescription(),
                                task.getStatus(),
                                task.getAuthor() != null ? task.getAuthor().getId() : null,
                                task.getAuthor() != null ? task.getAuthor().getName() : null,  // Dodano authorName
                                task.getStart_date(),
                                task.getEnd_date(),
                                task.getProject() != null ? task.getProject().getId() : null,
                                task.getProjectTemplate() != null ? task.getProjectTemplate().getId() : null,
                                0,  // statusCode
                                "",  // error
                                ""   // message
                        ))
                        .collect(Collectors.toList()) : null
        );

        return projectTemplateDTO;
    }

    public ProjectTemplateDTO createProjectTemplate(ProjectTemplateDTO projectTemplateDTO) {
        ProjectTemplate projectTemplate = new ProjectTemplate(
                null,
                projectTemplateDTO.getName(),
                projectTemplateDTO.getDescription(),
                null
        );
        ProjectTemplate savedTemplate = projectTemplateRepository.save(projectTemplate);
        return new ProjectTemplateDTO(savedTemplate.getId(), savedTemplate.getName(), savedTemplate.getDescription(), null);
    }

    public ProjectTemplateDTO updateProjectTemplate(Integer id, ProjectTemplateDTO projectTemplateDTO) {
        ProjectTemplate projectTemplate = projectTemplateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project Template not found"));

        projectTemplate.setName(projectTemplateDTO.getName());
        projectTemplate.setDescription(projectTemplateDTO.getDescription());
        ProjectTemplate updatedTemplate = projectTemplateRepository.save(projectTemplate);

        return new ProjectTemplateDTO(
                updatedTemplate.getId(),
                updatedTemplate.getName(),
                updatedTemplate.getDescription(),
                updatedTemplate.getTasks().stream()
                        .map(task -> new TaskDTO(
                                task.getId(),
                                task.getName(),
                                task.getDescription(),
                                task.getStatus(),
                                task.getAuthor() != null ? task.getAuthor().getId() : null,
                                task.getAuthor() != null ? task.getAuthor().getName() : null,  // Dodano authorName
                                task.getStart_date(),
                                task.getEnd_date(),
                                task.getProject() != null ? task.getProject().getId() : null,
                                task.getProjectTemplate() != null ? task.getProjectTemplate().getId() : null,
                                0,  // statusCode
                                "",  // error
                                ""   // message
                        ))
                        .collect(Collectors.toList())
        );
    }

    public void deleteProjectTemplate(Integer id) {
        projectTemplateRepository.deleteById(id);
    }
}
