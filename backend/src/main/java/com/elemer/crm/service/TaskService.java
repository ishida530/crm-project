package com.elemer.crm.service;

import com.elemer.crm.dto.TaskDTO;
import com.elemer.crm.entity.Project;
import com.elemer.crm.entity.Task;
import com.elemer.crm.repository.ProjectsRepository;
import com.elemer.crm.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectsRepository projectsRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, ProjectsRepository projectsRepository) {
        this.taskRepository = taskRepository;
        this.projectsRepository = projectsRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(int id) {
        return taskRepository.findById(id);
    }

    public List<Task> getTasksByProjectId(int projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    public List<Task> getTasksByAuthor(String author) {
        return taskRepository.findByAuthor(author);
    }

    public Task createTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());
        task.setStatus(taskDTO.getStatus());
        task.setAuthor(taskDTO.getAuthor());
        task.setDate(taskDTO.getDate());
        task.setEndDate(taskDTO.getEndDate());

        if (taskDTO.getProject() != null) {
            Project project = projectsRepository.findById(taskDTO.getProject())
                    .orElseThrow(() -> new IllegalArgumentException("Project with ID " + taskDTO.getProject() + " not found"));

            task.setProject(project);
        } else {
            task.setProject(null);
        }

        return taskRepository.save(task);
    }

    public Task updateTask(int id, TaskDTO taskDetails) {
        System.out.println(taskDetails);
        try {
            return taskRepository.findById(id)

                    .map(task -> {

                        task.setName(taskDetails.getName());
                        task.setDescription(taskDetails.getDescription());
                        task.setStatus(taskDetails.getStatus());
                        task.setAuthor(taskDetails.getAuthor());

                        return taskRepository.save(task);
                    })
                    .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
        } catch (Exception e) {
            throw new RuntimeException("Error updating task with id " + id + ": " + e.getMessage(), e);
        }
    }

    public void deleteTask(int id) {
        try {
            if (taskRepository.existsById(id)) {
                taskRepository.deleteById(id);
            } else {
                throw new RuntimeException("Task not found with id " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error deleting task with id " + id + ": " + e.getMessage(), e);
        }
    }
}
