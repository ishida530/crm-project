import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { useLocation } from 'react-router-dom';
import { Task } from '@/features/projects/types';

const deleteTask = async (taskId: number): Promise<Task> => {
    const response = await axiosInstance.delete(`/projects/tasks/${taskId}`);
    return response.data;
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const { pathname } = useLocation()
    const { mutate, isError, data } = useMutation<Task, Error, number>({
        mutationFn: deleteTask,
        onSuccess: (data) => {
            console.log('Task deleted successfully:', data);

            if (pathname.includes("templates")) {
                queryClient.invalidateQueries({ queryKey: ['getProjectTemplateDetails'] });

            } else {
                queryClient.invalidateQueries({ queryKey: ['getProjectDetails'] });

            }

        },
        onError: (error) => {
            console.error('Error deleting task:', error);
        },
    });

    return {
        mutate,
        isError,
        data,
    };
};
