import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Project, CreateProjectResponse } from '../types';


export const useCreateProject = () => {
    const queryClient = useQueryClient()

    const createProject = async (projectData: Project): Promise<CreateProjectResponse> => {
        console.log(projectData)
        const response = await axiosInstance.post('/projects', projectData);
        return response.data;
    };


    return useMutation<CreateProjectResponse, Error, Project>({
        mutationFn: createProject,
        onSuccess: (data) => {
            console.log('Project created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllProjects'] })

        },
        onError: (error) => {
            console.error('Error creating project:', error);
        },
    });
};
