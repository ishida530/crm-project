package com.elemer.crm.service;

import com.elemer.crm.dto.ProjectGroupDTO;
import com.elemer.crm.entity.ProjectGroup;
import com.elemer.crm.repository.ProjectGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectGroupService {

    @Autowired
    private ProjectGroupRepository projectGroupRepository;

    public List<ProjectGroupDTO> getAllGroups() {
        List<ProjectGroup> groups = projectGroupRepository.findAll();
        return groups.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ProjectGroupDTO getGroupById(int id) {
        ProjectGroup group = projectGroupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Group with ID " + id + " not found"));
        return convertToDTO(group);
    }

    @Transactional
    public ProjectGroupDTO createGroup(ProjectGroupDTO groupDTO) {
        ProjectGroup group = new ProjectGroup();
        group.setName(groupDTO.getName());
        ProjectGroup savedGroup = projectGroupRepository.save(group);
        return convertToDTO(savedGroup);
    }

    @Transactional
    public ProjectGroupDTO updateGroup(int id, ProjectGroupDTO groupDTO) {
        ProjectGroup group = projectGroupRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Group with ID " + id + " not found"));
        group.setName(groupDTO.getName());
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
        return dto;
    }
}
