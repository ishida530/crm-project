package com.elemer.crm.service;

import com.elemer.crm.dto.HttpResponse;
import com.elemer.crm.dto.ProjectDTO;
import com.elemer.crm.entity.Project;
import com.elemer.crm.entity.ProjectTemplate;
import com.elemer.crm.entity.Task;
import com.elemer.crm.repository.ProjectTemplateRepository;
import com.elemer.crm.repository.ProjectsRepository;
import com.elemer.crm.util.EncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectsService {

    @Autowired
    private ProjectsRepository projectsRepository;

    @Autowired
    private ProjectTemplateRepository projectTemplateRepository;

    public HttpResponse getAllProjects() {
        HttpResponse httpResponse = new HttpResponse();
        try {
            List<Project> projectList = projectsRepository.findAll();
            if (!projectList.isEmpty()) {
                projectList.forEach(this::decryptProjectData);
                httpResponse.setProjects(projectList);
                httpResponse.setStatusCode(200);
                httpResponse.setMessage("Successful");
            } else {
                httpResponse.setStatusCode(404);
                httpResponse.setMessage("No projects found");
            }
        } catch (Exception e) {
            httpResponse.setStatusCode(500);
            httpResponse.setMessage("Error occurred: " + e.getMessage());
        }
        return httpResponse;
    }

    public HttpResponse addProject(ProjectDTO projectRequest) {
        HttpResponse httpResponse = new HttpResponse();

        try {
            Project newProject = new Project();
            newProject.setName(EncryptionUtil.encrypt(projectRequest.getName()));
            newProject.setProject_manager(EncryptionUtil.encrypt(projectRequest.getProject_manager()));
            newProject.setDeadline(projectRequest.getDeadline());
            newProject.setInvestor_representative(EncryptionUtil.encrypt(projectRequest.getInvestor_representative()));

            if (projectRequest.getProject_template_id() != null) {
                Integer templateId = projectRequest.getProject_template_id();
                ProjectTemplate template = projectTemplateRepository.findById(templateId)
                        .orElseThrow(() -> new IllegalArgumentException("Project Template with ID " + templateId + " not found"));

                List<Task> tasks = template.getTasks().stream()
                        .map(templateTask -> {
                            Task newTask = new Task();
                            newTask.setName(templateTask.getName());
                            newTask.setDescription(templateTask.getDescription());
                            newTask.setStatus(templateTask.getStatus());
                            newTask.setAuthor(templateTask.getAuthor());
                            newTask.setStart_date(templateTask.getStart_date());
                            newTask.setEnd_date(templateTask.getEnd_date());
                            newTask.setProject(newProject);
                            return newTask;
                        })
                        .toList();

                newProject.setTasks(tasks);
            }

            projectsRepository.save(newProject);

            httpResponse.setProject(newProject);
            httpResponse.setStatusCode(200);
            httpResponse.setMessage("Project added successfully with tasks from template (if applicable)");
        } catch (Exception e) {
            httpResponse.setStatusCode(500);
            httpResponse.setMessage("Error occurred: " + e.getMessage());
        }
        return httpResponse;
    }


    public HttpResponse getProjectById(Integer id) {
        HttpResponse httpResponse = new HttpResponse();
        try {
            Project projectById = projectsRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Project not found"));

            decryptProjectData(projectById);

            httpResponse.setProject(projectById);
            httpResponse.setStatusCode(200);
            httpResponse.setMessage("Project with ID: " + id + " found successfully");
        } catch (Exception e) {
            httpResponse.setStatusCode(500);
            httpResponse.setMessage("Error occurred: " + e.getMessage());
        }
        return httpResponse;
    }

    public HttpResponse updateProject(Integer id, ProjectDTO projectRequest) {
        HttpResponse httpResponse = new HttpResponse();
        try {
            Project existingProject = projectsRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Project not found"));

            existingProject.setName(EncryptionUtil.encrypt(projectRequest.getName()));
            existingProject.setDeadline(projectRequest.getDeadline());
            existingProject.setInvestor_representative(EncryptionUtil.encrypt(projectRequest.getInvestor_representative()));

            projectsRepository.save(existingProject);
            httpResponse.setProject(existingProject);
            httpResponse.setStatusCode(200);
            httpResponse.setMessage("Project updated successfully");
        } catch (Exception e) {
            httpResponse.setStatusCode(500);
            httpResponse.setMessage("Error occurred: " + e.getMessage());
        }
        return httpResponse;
    }

    public HttpResponse deleteProject(Integer id) {
        HttpResponse httpResponse = new HttpResponse();
        try {
            Project project = projectsRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Project not found"));

            projectsRepository.delete(project);
            httpResponse.setStatusCode(200);
            httpResponse.setMessage("Project deleted successfully");
        } catch (Exception e) {
            httpResponse.setStatusCode(500);
            httpResponse.setMessage("Error occurred: " + e.getMessage());
        }
        return httpResponse;
    }

    private void decryptProjectData(Project project) {
        project.setName(EncryptionUtil.decrypt(project.getName()));
        project.setProject_manager(EncryptionUtil.decrypt(project.getProject_manager()));
        project.setInvestor_representative(EncryptionUtil.decrypt(project.getInvestor_representative()));
    }
}
