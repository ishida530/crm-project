package com.elemer.crm.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectGroupDTO {
    private Integer id;
    private String name;
    private List<ProjectDTO> projects;
    private Integer project_template_id;
    private ProjectTemplateDTO projectTemplate;
}
