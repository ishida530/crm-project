

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
    date: Date;
    endDate?: Date;
    name: string;
    project?: number;
};

export type Project = {
    id?: number;
    name: string;
    deadline: string;
    investorRepresentative: string;
    projectManager: string;
    tasks?: Task[];
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