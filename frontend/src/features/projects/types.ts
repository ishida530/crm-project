

export enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export type Task = {
    id?: number;
    description: string;
    status?: TaskStatus;
    author?: string;
    startDate: Date;
    endDate?: Date;
    name: string;
    project?: number;
    nothificationSent: number
    projectTemplateId?: number
};

export type Project = {
    id?: number;
    name: string;
    deadline: string;
    investorRepresentative: string;
    projectManager: string;
    tasks?: Task[];
    projectTemplateId?:number;
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