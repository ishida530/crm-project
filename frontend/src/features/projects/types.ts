import { User } from "../users/types";


export enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export interface Task {
    id?: number;
    description: string;
    status?: TaskStatus;
    author?: User | number;
    start_date?: Date | string;
    end_date?: Date | string;
    name: string;
    project?: number;
    nothification_sent?: number;
    project_template_id?: number;
}

export type Project = {
    id?: number;
    name: string;
    deadline: Date;
    investor_representative: string;
    project_manager: string;
    tasks?: Task[];
    project_template_id?: number;
    group_id?:number
};

export type ProjectsResponse = {
    statusCode: number;
    message: string;
    projects: Project[];
};
export type CreateProjectResponse = {
    statusCode: number;
    message: string;
    projects: Project;
};

export type BadgeVariantsColor = 'default' | 'secondary' | 'destructive' | 'outline' | null | undefined;


export type DeleteProjectResponse = {
    statusCode: number,
    message: string
}

export type ProjectResponse = {
    statusCode: number;
    message: string;
    project: Project;
}