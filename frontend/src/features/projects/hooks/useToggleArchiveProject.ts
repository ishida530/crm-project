import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { ProjectsResponse } from '../types';

export const useToggleArchiveProject = () => {
    const queryClient = useQueryClient();

    const toggleArchiveProject = async (projectId: number, isArchived: boolean): Promise<ProjectsResponse> => {
        const endpoint = isArchived ? `/projects/${projectId}/unarchive` : `/projects/${projectId}/archive`;
        const response = await axiosInstance.put(endpoint);
        return response.data;
    };

    return useMutation<ProjectsResponse, Error, { projectId: number; isArchived: boolean }>({
        mutationFn: ({ projectId, isArchived }) => toggleArchiveProject(projectId, isArchived),
        onSuccess: (data) => {
            console.log('Project archive status updated successfully:', data);
            // Odśwież dane projektów w cache
            queryClient.invalidateQueries({ queryKey: ['getAllProjects'] });
        },
        onError: (error) => {
            console.error('Error updating project archive status:', error);
        },
    });
};
