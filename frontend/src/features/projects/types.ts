import { UserRole } from "../users/types";


export enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export type Task = {
    id: number;
    description: string;
    status: TaskStatus;
    author: string;
    date: string;
};

export type Project = {
    id: number;
    name: string;
    deadline: string;
    investorRepresentative: string;
    projectManager: string;
    tasks: Task[];
};

export type ProjectsResponse = {
    statusCode: number;
    message: string;
    projects: Project[];
};
