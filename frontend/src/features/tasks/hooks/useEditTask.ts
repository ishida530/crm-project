import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Task, } from '../../projects/types';
import { useLocation } from 'react-router-dom';

export const useEditTask = () => {
    const queryClient = useQueryClient();
    const { pathname } = useLocation()
    const editTask = async (taskData: Task): Promise<Task> => {
        const response = await axiosInstance.put(`/projects/tasks/${taskData.id}`, taskData);
        return response.data;
    };

    return useMutation<Task, Error, Task>({
        mutationFn: editTask,
        onSuccess: (data) => {
            console.log('Task updated successfully:', data);
            if (pathname.includes("templates")) {
                queryClient.invalidateQueries({ queryKey: ['getProjectTemplateDetails'] });
            } else {
                queryClient.invalidateQueries({ queryKey: ['getProjectDetailsTasks'] });

            }
        },
        onError: (error) => {
            console.error('Error updating task:', error);
        },
    });
};
