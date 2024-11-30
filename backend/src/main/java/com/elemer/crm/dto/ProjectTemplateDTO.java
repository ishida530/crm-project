package com.elemer.crm.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTemplateDTO {

    private Integer id;

    @NotNull(message = "Project template name cannot be null")
    @Size(min = 3, max = 50, message = "Project template name must be between 3 and 50 characters")
    private String name;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    private List<TaskDTO> tasks;
}
