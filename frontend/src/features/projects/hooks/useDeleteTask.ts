import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '../types';
import axiosInstance from '@/api/api';

const deleteTask = async (taskId: number): Promise<Task> => {
    const response = await axiosInstance.delete(`/projects/tasks/${taskId}`);
    return response.data;
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    
    const { mutate, isError, data } = useMutation<Task, Error, number>({
        mutationFn: deleteTask, 
        onSuccess: (data) => {
            console.log('Task deleted successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getProjectDetails'] });
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
