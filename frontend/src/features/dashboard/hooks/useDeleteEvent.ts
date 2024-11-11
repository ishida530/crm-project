import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '../types';
import axiosInstance from '@/api/api';

const deleteEvent = async (taskId: number): Promise<Task> => {
    const response = await axiosInstance.delete(`/projects/tasks/${taskId}`);
    return response.data;
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();

    const { mutate, isError, data } = useMutation<Task, Error, number>({
        mutationFn: deleteEvent,
        onSuccess: (data) => {
            console.log('Event deleted successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllEvents'] });
        },
        onError: (error) => {
            console.error('Error deleting event:', error);
        },
    });

    return {
        mutate,
        isError,
        data,
    };
};
