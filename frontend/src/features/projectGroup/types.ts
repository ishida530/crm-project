// types.ts

import { Project } from "../projects/types";
import { ProjectTemplate } from "../projectsTemplates/types";


export interface TaskDTO {
    // Zakładając, że istnieją jakieś właściwości zadania
    id: number;
    description: string;
    status: string;
}



export interface ProjectGroup {
    id:number;
    name: string;
    projects?: Project[];
    project_template_id?: number;
    projectTemplate?: ProjectTemplate;
}

// Response types

export interface RegisterProjectGroup {
    name: string;
    project_template_id:number

}

export interface UpdateProjectGroupResponse {
    id: number;
    name: string;
    project_template_id:number
    // Można dodać inne pola odpowiedzi w zależności od tego, co API zwraca po aktualizacji
}

export interface DeleteProjectGroupResponse {
    success: boolean;
    message: string;
}
