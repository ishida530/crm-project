import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Task } from '../../projects/types';
import { useLocation } from 'react-router-dom';


export const useCreateTask = () => {
    const queryClient = useQueryClient()
    const { pathname } = useLocation()
    const createTask = async (taskData: Task): Promise<Task> => {
        const response = await axiosInstance.post('/projects/tasks', taskData);
        return response.data;
    };


    return useMutation<Task, Error, Task>({
        mutationFn: createTask,
        onSuccess: (data) => {
            console.log('Task created successfully:', data);
    
            if (pathname.includes("templates")) {
                queryClient.invalidateQueries({ queryKey: ['getProjectTemplateDetails'] });
            } else {
                queryClient.invalidateQueries({ queryKey: ['getProjectDetails'] });

            }
        },
        onError: (error) => {
            console.error('Error creating task:', error);
        },
    });
};
