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

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
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

        task.setStart_date(taskDTO.getStartDate());
        task.setEnd_date(taskDTO.getEndDate());
        // Obsługuje przypisanie projektu, jeśli zostało podane
        if (taskDTO.getProject() != null) {
            Project project = projectsRepository.findById(taskDTO.getProject())
                    .orElseThrow(() -> new IllegalArgumentException("Project with ID " + taskDTO.getProject() + " not found"));
            task.setProject(project);
        }

        // Obsługuje przypisanie szablonu projektu, jeśli zostało podane
        if (taskDTO.getProjectTemplateId() != null) {
            ProjectTemplate projectTemplate = projectTemplateRepository.findById(taskDTO.getProjectTemplateId())
                    .orElseThrow(() -> new IllegalArgumentException("Project Template with ID " + taskDTO.getProjectTemplateId() + " not found"));
            task.setProjectTemplate(projectTemplate);
        }
System.out.println(task);
        // Zapisujemy zadanie do bazy danych
        return taskRepository.save(task);
    }


    public Task updateTask(Integer id, TaskDTO taskDetails) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setName(taskDetails.getName());
                    task.setDescription(taskDetails.getDescription());
                    task.setStatus(taskDetails.getStatus());

                    if (taskDetails.getAuthor() == null) {
                        throw new IllegalArgumentException("Author must be provided");
                    }

                    User author = usersRepository.findById(taskDetails.getAuthor())
                            .orElseThrow(() -> new IllegalArgumentException("Author with ID " + taskDetails.getAuthor() + " not found"));
                    task.setAuthor(author);

                    if (taskDetails.getProjectTemplateId() != null) {
                        ProjectTemplate projectTemplate = projectTemplateRepository.findById(taskDetails.getProjectTemplateId())
                                .orElseThrow(() -> new IllegalArgumentException("Project Template with ID " + taskDetails.getProjectTemplateId() + " not found"));
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
