import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Task } from '../types';


export const useCreateTask = () => {
    const queryClient = useQueryClient()

    const createTask = async (taskData: Task): Promise<Task> => {
        const response = await axiosInstance.post('/projects/tasks', taskData);
        return response.data;
    };


    return useMutation<Task, Error, Task>({
        mutationFn: createTask,
        onSuccess: (data) => {
            console.log('Task created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getProjectDetails'] })

        },
        onError: (error) => {
            console.error('Error creating task:', error);
        },
    });
};
