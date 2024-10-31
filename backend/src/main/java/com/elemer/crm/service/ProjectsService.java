package com.elemer.crm.service;

import com.elemer.crm.dto.HttpResponse;
import com.elemer.crm.dto.ProjectDTO;
import com.elemer.crm.entity.Project;
import com.elemer.crm.repository.ProjectsRepository;
import com.elemer.crm.util.EncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectsService {

    @Autowired
    private ProjectsRepository projectsRepository;

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
            newProject.setProjectManager(EncryptionUtil.encrypt(projectRequest.getProjectManager()));
            newProject.setName(EncryptionUtil.encrypt(projectRequest.getName()));
            newProject.setDeadline(projectRequest.getDeadline()); // Zakładamy, że daty nie szyfrujemy
            newProject.setInvestorRepresentative(EncryptionUtil.encrypt(projectRequest.getInvestorRepresentative()));

            projectsRepository.save(newProject);
            httpResponse.setProject(newProject);
            httpResponse.setStatusCode(200);
            httpResponse.setMessage("Project added successfully with encrypted data");
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

            // Decrypt project data before setting response
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
            existingProject.setProjectManager(EncryptionUtil.encrypt(projectRequest.getProjectManager()));
            existingProject.setDeadline(projectRequest.getDeadline()); // Date does not need encryption
            existingProject.setInvestorRepresentative(EncryptionUtil.encrypt(projectRequest.getInvestorRepresentative()));

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

            // Delete project
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
        project.setProjectManager(EncryptionUtil.decrypt(project.getProjectManager()));
        project.setInvestorRepresentative(EncryptionUtil.decrypt(project.getInvestorRepresentative()));
    }
}
