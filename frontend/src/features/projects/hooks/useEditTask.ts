import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Task, } from '../types'; // Assuming you have Task and UpdateTaskResponse types

export const useEditTask = () => {
    const queryClient = useQueryClient();

    const editTask = async (taskData: Task): Promise<Task> => {
        const response = await axiosInstance.put(`/projects/tasks/${taskData.id}`, taskData);
        return response.data;
    };

    return useMutation<Task, Error, Task>({
        mutationFn: editTask,
        onSuccess: (data) => {
            console.log('Task updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getProjectDetails'] });
        },
        onError: (error) => {
            console.error('Error updating task:', error);
        },
    });
};
