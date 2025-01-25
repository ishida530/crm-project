package com.elemer.crm.service;

import com.elemer.crm.dto.ProjectGroupDTO;
import com.elemer.crm.dto.ProjectTemplateDTO;
import com.elemer.crm.dto.TaskDTO;
import com.elemer.crm.entity.ProjectGroup;
import com.elemer.crm.entity.ProjectTemplate;
import com.elemer.crm.repository.ProjectGroupRepository;
import com.elemer.crm.repository.ProjectTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectGroupService {

    @Autowired
    private ProjectGroupRepository projectGroupRepository;

    @Autowired
    private ProjectTemplateRepository projectTemplateRepository;  // Reposytorium dla ProjectTemplate

    public List<ProjectGroupDTO> getAllGroups() {
        List<ProjectGroup> groups = projectGroupRepository.findAll();
        return groups.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ProjectGroupDTO getGroupById(int id) {
        ProjectGroup group = projectGroupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Group with ID " + id + " not found"));

        // Tworzymy ProjectTemplateDTO z zadaniami
        ProjectTemplateDTO templateDTO = null;
        if (group.getProjectTemplate() != null) {
            templateDTO = new ProjectTemplateDTO();
            templateDTO.setId(group.getProjectTemplate().getId());
            templateDTO.setName(group.getProjectTemplate().getName());
            templateDTO.setDescription(group.getProjectTemplate().getDescription());

            // Dodanie zadań z szablonu, mapując tylko nazwę zadania
            if (group.getProjectTemplate().getTasks() != null) {
                List<TaskDTO> taskDTOs = group.getProjectTemplate().getTasks().stream()
                        .map(task -> new TaskDTO(
                                task.getId(),
                                task.getName()
                        ))
                        .collect(Collectors.toList());
                templateDTO.setTasks(taskDTOs); // Ustawiamy zadania w szablonie
            }
        }

        ProjectGroupDTO resultDTO = convertToDTO(group);
        resultDTO.setProjectTemplate(templateDTO); // Dodajemy pełne dane szablonu do odpowiedzi
        return resultDTO;
    }

    @Transactional
    public ProjectGroupDTO createGroup(ProjectGroupDTO groupDTO) {
        ProjectGroup group = new ProjectGroup();
        group.setName(groupDTO.getName());

        // Dodanie obsługi ID szablonu
        if (groupDTO.getProject_template_id() != null) {
            ProjectTemplate template = projectTemplateRepository.findById(groupDTO.getProject_template_id())
                    .orElseThrow(() -> new IllegalArgumentException("Template with ID " + groupDTO.getProject_template_id() + " not found"));
            group.setProjectTemplate(template);  // Przypisanie szablonu do grupy
        }

        ProjectGroup savedGroup = projectGroupRepository.save(group);

        // Tworzenie ProjectTemplateDTO do pełnych danych szablonu
        ProjectTemplateDTO templateDTO = null;
        if (savedGroup.getProjectTemplate() != null) {
            templateDTO = new ProjectTemplateDTO();
            templateDTO.setId(savedGroup.getProjectTemplate().getId());
            templateDTO.setName(savedGroup.getProjectTemplate().getName());
            templateDTO.setDescription(savedGroup.getProjectTemplate().getDescription());

            // Dodanie zadań z szablonu, mapując tylko nazwę zadania
            if (savedGroup.getProjectTemplate().getTasks() != null) {
                List<TaskDTO> taskDTOs = savedGroup.getProjectTemplate().getTasks().stream()
                        .map(task -> new TaskDTO(
                                task.getId(),
                                task.getName()
                        ))
                        .collect(Collectors.toList());
                templateDTO.setTasks(taskDTOs); // Ustawiamy zadania w szablonie
            }
        }

        // Zwracamy grupę wraz z pełnym obiektem szablonu i zadaniami
        ProjectGroupDTO resultDTO = convertToDTO(savedGroup);
        resultDTO.setProjectTemplate(templateDTO);  // Dodajemy pełne dane szablonu do odpowiedzi

        return resultDTO;
    }

    @Transactional
    public ProjectGroupDTO updateGroup(int id, ProjectGroupDTO groupDTO) {
        ProjectGroup group = projectGroupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Group with ID " + id + " not found"));
        group.setName(groupDTO.getName());

        if (groupDTO.getProjectTemplate() != null) {
            ProjectTemplate template = projectTemplateRepository.findById(groupDTO.getProjectTemplate().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Template with ID " + groupDTO.getProjectTemplate().getId() + " not found"));
            group.setProjectTemplate(template);  // Przypisanie szablonu za pomocą ID
        }

        ProjectGroup updatedGroup = projectGroupRepository.save(group);
        return convertToDTO(updatedGroup);
    }

    @Transactional
    public void deleteGroup(int id) {
        if (!projectGroupRepository.existsById(id)) {
            throw new IllegalArgumentException("Group with ID " + id + " not found");
        }
        projectGroupRepository.deleteById(id);
    }

    private ProjectGroupDTO convertToDTO(ProjectGroup group) {
        ProjectGroupDTO dto = new ProjectGroupDTO();
        dto.setName(group.getName());

        // Przypisanie pełnych danych szablonu, jeśli istnieje
        if (group.getProjectTemplate() != null) {
            ProjectTemplateDTO templateDTO = new ProjectTemplateDTO();
            templateDTO.setId(group.getProjectTemplate().getId());
            templateDTO.setName(group.getProjectTemplate().getName());
            templateDTO.setDescription(group.getProjectTemplate().getDescription());
            dto.setProjectTemplate(templateDTO);  // Ustawiamy pełne dane szablonu
        }

        return dto;
    }
}
