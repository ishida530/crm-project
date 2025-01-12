import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Task } from '../../projects/types';
import { useLocation } from 'react-router-dom';

export const useEditTask = () => {
    const queryClient = useQueryClient();
    const { pathname } = useLocation();

    // Function to format date in 'yyyy-MM-dd HH:mm:ss'
    const formatDateTime = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const editTask = async (taskData: Task): Promise<Task> => {
        // Format start_date to 'yyyy-MM-dd HH:mm:ss' format
        taskData.start_date = formatDateTime(new Date(taskData.start_date));

        // Optionally, format end_date if needed
        if (taskData.end_date) {
            taskData.end_date = formatDateTime(new Date(taskData.end_date));
        }

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
