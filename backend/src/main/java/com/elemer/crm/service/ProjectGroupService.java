package com.elemer.crm.service;

import com.elemer.crm.dto.ProjectDTO;
import com.elemer.crm.dto.ProjectGroupDTO;
import com.elemer.crm.dto.ProjectTemplateDTO;
import com.elemer.crm.dto.TaskDTO;
import com.elemer.crm.entity.Project;
import com.elemer.crm.entity.ProjectGroup;
import com.elemer.crm.entity.ProjectTemplate;
import com.elemer.crm.repository.ProjectGroupRepository;
import com.elemer.crm.repository.ProjectTemplateRepository;
import com.elemer.crm.util.EncryptionUtil;
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

        // Decrypt project data
        group.getProjects().forEach(this::decryptProjectData);

        // Tworzymy ProjectTemplateDTO z zadaniami
        ProjectTemplateDTO templateDTO = null;
        if (group.getProjectTemplate() != null) {
            templateDTO = new ProjectTemplateDTO();
            templateDTO.setId(group.getProjectTemplate().getId());
            templateDTO.setName(group.getProjectTemplate().getName());
            templateDTO.setDescription(group.getProjectTemplate().getDescription());

            // Dodanie zadań z szablonu, mapując wszystkie właściwości zadania
            if (group.getProjectTemplate().getTasks() != null) {
                List<TaskDTO> taskDTOs = group.getProjectTemplate().getTasks().stream()
                        .map(task -> {
                            // Korzystamy z istniejącego konstruktora i ustawiamy wszystkie właściwości
                            TaskDTO taskDTO = new TaskDTO(task.getId(), task.getName(), task.getStatus());
                            taskDTO.setDescription(task.getDescription());
                            taskDTO.setStart_date(task.getStart_date());
                            taskDTO.setEnd_date(task.getEnd_date());

                            // Ustawiamy autora zadania, jeśli dostępny
                            if (task.getAuthor() != null) {
                                taskDTO.setAuthor(task.getAuthor().getId()); // Założenie: Author ma metodę getId()
                                taskDTO.setAuthor_name(task.getAuthor().getName()); // Przypisujemy imię autora
                            }

                            // Jeśli istnieje projekt szablonu przypisany do zadania, ustawiamy projekt szablonu
                            if (task.getProjectTemplate() != null) {
                                taskDTO.setProject_template_id(task.getProjectTemplate().getId());
                            }

                            return taskDTO;
                        })
                        .collect(Collectors.toList());
                templateDTO.setTasks(taskDTOs); // Ustawiamy zadania w szablonie
            }
        }

        // Tworzymy wynikowy ProjectGroupDTO
        ProjectGroupDTO resultDTO = convertToDTO(group);
        resultDTO.setProjectTemplate(templateDTO); // Dodajemy pełne dane szablonu do odpowiedzi

        // Mapujemy projekty przypisane do grupy
        if (group.getProjects() != null) {
            List<ProjectDTO> projectDTOs = group.getProjects().stream()
                    .map(project -> {
                        ProjectDTO projectDTO = new ProjectDTO();
                        projectDTO.setId(project.getId());
                        projectDTO.setName(project.getName());
                        projectDTO.setDeadline(project.getDeadline());
                        projectDTO.setInvestor_representative(project.getInvestor_representative());
                        projectDTO.setProject_manager(project.getProject_manager());

                        // Mapujemy zadania przypisane do projektu
                        if (project.getTasks() != null) {
                            List<TaskDTO> projectTaskDTOs = project.getTasks().stream()
                                    .map(task -> {
                                        // Korzystamy z istniejącego konstruktora i ustawiamy wszystkie właściwości
                                        TaskDTO taskDTO = new TaskDTO(task.getId(), task.getName(), task.getStatus());
                                        taskDTO.setDescription(task.getDescription());
                                        taskDTO.setStart_date(task.getStart_date());
                                        taskDTO.setEnd_date(task.getEnd_date());
                                        taskDTO.setAuthor(task.getAuthor() != null ? task.getAuthor().getId() : null);
                                        taskDTO.setAuthor_name(task.getAuthor() != null ? task.getAuthor().getName() : null);
                                        taskDTO.setProject_template_id(task.getProjectTemplate() != null ? task.getProjectTemplate().getId() : null);
                                        return taskDTO;
                                    })
                                    .collect(Collectors.toList());
                            projectDTO.setTasks(projectTaskDTOs); // Dodajemy zadania do projektu
                        }

                        return projectDTO;
                    })
                    .collect(Collectors.toList());
            resultDTO.setProjects(projectDTOs); // Dodajemy projekty do odpowiedzi
        }

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

        // Sprawdzamy, czy lista projektów nie jest nullem
        if (savedGroup.getProjects() != null) {
            // Decrypt project data
            savedGroup.getProjects().forEach(this::decryptProjectData);
        }

        // Tworzenie ProjectTemplateDTO do pełnych danych szablonu
        ProjectTemplateDTO templateDTO = null;
        if (savedGroup.getProjectTemplate() != null) {
            templateDTO = new ProjectTemplateDTO();
            templateDTO.setId(savedGroup.getProjectTemplate().getId());
            templateDTO.setName(savedGroup.getProjectTemplate().getName());
            templateDTO.setDescription(savedGroup.getProjectTemplate().getDescription());
            // Dodaj inne pola szablonu, które chcesz przekazać w DTO
        }

        // Mapowanie grupy do DTO
        ProjectGroupDTO savedGroupDTO = new ProjectGroupDTO();
        savedGroupDTO.setId(savedGroup.getId());
        savedGroupDTO.setName(savedGroup.getName());
        savedGroupDTO.setProjectTemplate(templateDTO);

        // Możesz dodać inne pola, które chcesz zwrócić w DTO

        return savedGroupDTO;
    }

    @Transactional
    public ProjectGroupDTO updateGroup(int id, ProjectGroupDTO groupDTO) {
        ProjectGroup group = projectGroupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Group with ID " + id + " not found"));
        group.setName(groupDTO.getName());
        group.setId(groupDTO.getId());

        if (groupDTO.getProjectTemplate() != null) {
            ProjectTemplate template = projectTemplateRepository.findById(groupDTO.getProjectTemplate().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Template with ID " + groupDTO.getProjectTemplate().getId() + " not found"));
            group.setProjectTemplate(template);  // Przypisanie szablonu za pomocą ID
        }

        ProjectGroup updatedGroup = projectGroupRepository.save(group);

        // Decrypt project data
        updatedGroup.getProjects().forEach(this::decryptProjectData);

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
        dto.setId(group.getId()); // Dodajemy przypisanie ID grupy

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

    // Method to decrypt project data
    private void decryptProjectData(Project project) {
        project.setName(EncryptionUtil.decrypt(project.getName()));
        project.setProject_manager(EncryptionUtil.decrypt(project.getProject_manager()));
        project.setInvestor_representative(EncryptionUtil.decrypt(project.getInvestor_representative()));
    }
}