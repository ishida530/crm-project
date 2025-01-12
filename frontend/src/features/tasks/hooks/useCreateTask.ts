import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Task } from '../../projects/types';
import { useLocation } from 'react-router-dom';

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const { pathname } = useLocation();

    // Function to format date in 'yyyy-MM-dd HH:mm:ss'
    const formatDateTime = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const createTask = async (taskData: Task): Promise<Task> => {
        // Format start_date to 'yyyy-MM-dd HH:mm:ss' string format
        taskData.start_date = formatDateTime(new Date(taskData.start_date));

        const response = await axiosInstance.post('/projects/tasks', taskData);
        return response.data;
    };

    return useMutation<Task, Error, Task>({
        mutationFn: createTask,
        onSuccess: (data) => {
            console.log('Task created successfully:', data);

            queryClient.invalidateQueries({ queryKey: ['getProjectTemplateDetails'] });
            queryClient.invalidateQueries({ queryKey: ['getProjectDetailsTasks'] });
        },
        onError: (error) => {
            console.error('Error creating task:', error);
        },
    });
};
