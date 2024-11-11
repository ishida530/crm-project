import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Project, ProjectsResponse } from '../types';

export const useEditProject = () => {
    const queryClient = useQueryClient();

    const editProject = async (projectData: Project): Promise<ProjectsResponse> => {
        console.log('')
        const response = await axiosInstance.put(`/projects/${projectData.id}`, projectData);
        return response.data;
    };

    return useMutation<ProjectsResponse, Error, Project>({
        mutationFn: editProject,
        onSuccess: (data) => {
            console.log('Task updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllProjects'] });
        },
        onError: (error) => {
            console.error('Error updating task:', error);
        },
    });
};
