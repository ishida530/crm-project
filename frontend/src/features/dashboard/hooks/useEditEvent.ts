import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Task } from '@/features/projects/types';

export const useEditEvent = () => {
    const queryClient = useQueryClient();

    const editEvent = async (taskData: Task): Promise<Task> => {
        const response = await axiosInstance.put(`/projects/tasks/${taskData.id}`, taskData);
        return response.data;
    };

    return useMutation<Task, Error, Task>({
        mutationFn: editEvent,
        onSuccess: (data) => {
            console.log('Task updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllEvents'] });
        },
        onError: (error) => {
            console.error('Error updating task:', error);
        },
    });
};
