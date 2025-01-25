package com.elemer.crm.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectGroupDTO {
    private String name;
    private List<ProjectDTO> projects;
}
