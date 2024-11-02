package com.elemer.crm.service;

import com.elemer.crm.entity.Task;
import com.elemer.crm.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
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

    public Task createTask(Task task) {
        try {
            return taskRepository.save(task);
        } catch (Exception e) {
            throw new RuntimeException("Error creating task: " + e.getMessage(), e);
        }
    }

    public Task updateTask(int id, Task taskDetails) {
        try {
            return taskRepository.findById(id)
                    .map(task -> {
                        task.setDescription(taskDetails.getDescription());
                        task.setStatus(taskDetails.getStatus());
                        task.setAuthor(taskDetails.getAuthor());
                        task.setProject(taskDetails.getProject());
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
