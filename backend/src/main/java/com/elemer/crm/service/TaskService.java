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

    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get task by its ID
    public Optional<Task> getTaskById(int id) {
        return taskRepository.findById(id);
    }

    // Get tasks by project ID
    public List<Task> getTasksByProjectId(int projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    // Get tasks by status
    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    // Get tasks by the author
    public List<Task> getTasksByAuthor(User author) {
        return taskRepository.findByAuthor(author);
    }

    // Create a new task
    public Task createTask(TaskDTO taskDTO) {
        if (taskDTO == null) {
            throw new IllegalArgumentException("Task data cannot be null");
        }

        // Create a new Task entity and set the values from TaskDTO
        Task task = new Task();
        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());
        task.setStatus(taskDTO.getStatus());

        // Ensure author is not null
        if (taskDTO.getAuthor() == null) {
            throw new IllegalArgumentException("Author must be provided");
        }

        // Fetch author from the repository
        User author = usersRepository.findById(taskDTO.getAuthor())
                .orElseThrow(() -> new IllegalArgumentException("Author with ID " + taskDTO.getAuthor() + " not found"));
        task.setAuthor(author);

        // Set start and end date from DTO
        task.setStartDate(taskDTO.getStartDate());
        task.setEndDate(taskDTO.getEndDate());

        // Check if a project is provided and set it
        if (taskDTO.getProject() != null) {
            Project project = projectsRepository.findById(taskDTO.getProject())
                    .orElseThrow(() -> new IllegalArgumentException("Project with ID " + taskDTO.getProject() + " not found"));
            task.setProject(project);
        }

        // Check if a project template is provided and set it
        if (taskDTO.getProjectTemplateId() != null) {
            ProjectTemplate projectTemplate = projectTemplateRepository.findById(taskDTO.getProjectTemplateId())
                    .orElseThrow(() -> new IllegalArgumentException("Project Template with ID " + taskDTO.getProjectTemplateId() + " not found"));
            task.setProjectTemplate(projectTemplate);
        }

        // Save the task entity to the database
        return taskRepository.save(task);
    }

    // Update an existing task
    public Task updateTask(Integer id, TaskDTO taskDetails) {
        return taskRepository.findById(id)
                .map(task -> {
                    // Update task fields with values from TaskDTO
                    task.setName(taskDetails.getName());
                    task.setDescription(taskDetails.getDescription());
                    task.setStatus(taskDetails.getStatus());

                    // Ensure author is not null
                    if (taskDetails.getAuthor() == null) {
                        throw new IllegalArgumentException("Author must be provided");
                    }

                    // Fetch and update author
                    User author = usersRepository.findById(taskDetails.getAuthor())
                            .orElseThrow(() -> new IllegalArgumentException("Author with ID " + taskDetails.getAuthor() + " not found"));
                    task.setAuthor(author);

                    // Update project template if provided
                    if (taskDetails.getProjectTemplateId() != null) {
                        ProjectTemplate projectTemplate = projectTemplateRepository.findById(taskDetails.getProjectTemplateId())
                                .orElseThrow(() -> new IllegalArgumentException("Project Template with ID " + taskDetails.getProjectTemplateId() + " not found"));
                        task.setProjectTemplate(projectTemplate);
                    }

                    // Save the updated task
                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }

    // Delete a task
    public void deleteTask(int id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
        } else {
            throw new RuntimeException("Task not found with id " + id);
        }
    }
}
