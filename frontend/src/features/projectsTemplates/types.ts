import { Task } from "../projects/types";

export interface ProjectTemplate {
    id?: number;
    name: string;
    description: string;
    tasks: Task[];
}

export interface UpdateProjectTemplateResponse {
    id: number;
    name: string;
    description: string;
    tasks: Task[];
}

export interface DeleteProjectTemplateResponse {
    id: number;
    message: string;
    statusCode: number;
}