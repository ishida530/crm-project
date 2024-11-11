import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteProjectResponse, DeleteUserResponse } from '../types';
import axiosInstance from '@/api/api';

const deleteProject = async (projectId: number): Promise<DeleteProjectResponse> => {
    const response = await axiosInstance.delete(`/projects/${projectId}`);
    return response.data;
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    const { mutate, isError, data, isPending } = useMutation<DeleteProjectResponse, Error, number>({
        mutationFn: deleteProject,
        onSuccess: (data) => {
            console.log('Project deleted successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllProjects'] })
        },
        onError: (error) => {
            console.error('Error deleting project:', error);
        },
    });

    return {
        mutate,
        isError,
        data,
        isPending,
    };
};
