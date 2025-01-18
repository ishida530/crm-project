package com.elemer.crm.service;

import com.elemer.crm.dto.TaskDTO;
import com.elemer.crm.entity.Project;
import com.elemer.crm.entity.ProjectTemplate;
import com.elemer.crm.entity.Task;
import com.elemer.crm.entity.User;
import com.elemer.crm.repository.ProjectTemplateRepository;
import com.elemer.crm.repository.ProjectsRepository;
import com.elemer.crm.repository.TaskRepository;
import com.elemer.crm.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectsRepository projectsRepository;
    private final ProjectTemplateRepository projectTemplateRepository;
    private final UsersRepository usersRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, ProjectsRepository projectsRepository,
                       ProjectTemplateRepository projectTemplateRepository, UsersRepository usersRepository) {
        this.taskRepository = taskRepository;
        this.projectsRepository = projectsRepository;
        this.projectTemplateRepository = projectTemplateRepository;
        this.usersRepository = usersRepository;
    }

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setName(task.getName());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setAuthor(task.getAuthor().getId());
        dto.setAuthor_name(task.getAuthorName());
        dto.setStart_date(task.getStart_date());
        dto.setEnd_date(task.getEnd_date());
        dto.setProject(task.getProject() != null ? task.getProject().getId() : null);
        dto.setProject_template_id(task.getProjectTemplate() != null ? task.getProjectTemplate().getId() : null);
        return dto;
    }
    public Optional<Task> getTaskById(int id) {
        return taskRepository.findById(id);
    }

    public List<TaskDTO> getTasksByProjectId(int projectId) {
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        List<TaskDTO> taskDTOs = new ArrayList<>();

        for (Task task : tasks) {
            // Tworzymy TaskDTO i ustawiamy odpowiednie dane
            TaskDTO taskDTO = new TaskDTO(
                    task.getId(),
                    task.getName(),
                    task.getDescription(),
                    task.getStatus(),
                    task.getAuthor() != null ? task.getAuthor().getId() : null,
                    task.getAuthorName(),  // Dodano authorName
                    task.getStart_date(),
                    task.getEnd_date(),
                    task.getProject() != null ? task.getProject().getId() : null,
                    task.getProjectTemplate() != null ? task.getProjectTemplate().getId() : null,
                    0,  // statusCode
                    "",  // error
                    ""   // message
            );

            taskDTOs.add(taskDTO);
        }

        return taskDTOs;
    }

    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    public List<Task> getTasksByAuthor(User author) {
        return taskRepository.findByAuthor(author);
    }

    public Task createTask(TaskDTO taskDTO) {
        if (taskDTO == null) {
            throw new IllegalArgumentException("Task data cannot be null");
        }
        Task task = new Task();
        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());
        task.setStatus(taskDTO.getStatus());

        // Sprawdzamy, czy zostało podane ID autora
        if (taskDTO.getAuthor() == null) {
            throw new IllegalArgumentException("Author ID must be provided");
        }

        // Znajdujemy użytkownika na podstawie ID
        User author = usersRepository.findById(taskDTO.getAuthor())
                .orElseThrow(() -> new IllegalArgumentException("Author with ID " + taskDTO.getAuthor() + " not found"));
        task.setAuthor(author); // Set the full User object, not just its ID

        task.setStart_date(taskDTO.getStart_date());

        task.setEnd_date(taskDTO.getEnd_date());
        // Obsługuje przypisanie projektu, jeśli zostało podane
        if (taskDTO.getProject() != null) {
            Project project = projectsRepository.findById(taskDTO.getProject())
                    .orElseThrow(() -> new IllegalArgumentException("Project with ID " + taskDTO.getProject() + " not found"));
            task.setProject(project);
        }
        // Obsługuje przypisanie szablonu projektu, jeśli zostało podane
        if (taskDTO.getProject_template_id() != null) {
            ProjectTemplate projectTemplate = projectTemplateRepository.findById(taskDTO.getProject_template_id())
                    .orElseThrow(() -> new IllegalArgumentException("Project Template with ID " + taskDTO.getProject_template_id() + " not found"));
            task.setProjectTemplate(projectTemplate);
        }
        // Zapisujemy zadanie do bazy danych
        return taskRepository.save(task);
    }


    public Task updateTask(Integer id, TaskDTO taskDetails) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setName(taskDetails.getName());
                    task.setDescription(taskDetails.getDescription());
                    task.setStatus(taskDetails.getStatus());
                    task.setStart_date(taskDetails.getStart_date());
                    task.setEnd_date(taskDetails.getEnd_date());

                    if (taskDetails.getAuthor() == null) {
                        throw new IllegalArgumentException("Author must be provided");
                    }

                    User author = usersRepository.findById(taskDetails.getAuthor())
                            .orElseThrow(() -> new IllegalArgumentException("Author with ID " + taskDetails.getAuthor() + " not found"));
                    task.setAuthor(author);

                    if (taskDetails.getProject_template_id() != null) {
                        ProjectTemplate projectTemplate = projectTemplateRepository.findById(taskDetails.getProject_template_id())
                                .orElseThrow(() -> new IllegalArgumentException("Project Template with ID " + taskDetails.getProject_template_id() + " not found"));
                        task.setProjectTemplate(projectTemplate);
                    }

                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }

    public void deleteTask(Integer id) {
        // Pobierz istniejące zadanie
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id)); // Jeśli zadanie nie istnieje, rzucamy wyjątek

        // Usuwamy powiązanie zadania z projektem
        if (existingTask.getProject() != null) {
            existingTask.setProject(null); // Usuwamy powiązanie z projektem
        }

        // Usuwamy powiązanie zadania z szablonem projektu
        if (existingTask.getProjectTemplate() != null) {
            existingTask.setProjectTemplate(null); // Usuwamy powiązanie z szablonem projektu
        }

        // Zapisujemy zadanie z zaktualizowanymi powiązaniami
        taskRepository.save(existingTask);

        // Teraz usuwamy zadanie z repozytorium
        taskRepository.delete(existingTask);
    }
}
