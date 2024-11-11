import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Task } from '@/features/projects/types';


export const useCreateEvent = () => {
    const queryClient = useQueryClient()

    const createTask = async (taskData: Task): Promise<Task> => {
        const response = await axiosInstance.post('/projects/tasks', taskData);
        return response.data;
    };

    return useMutation<Task, Error, Task>({
        mutationFn: createTask,
        onSuccess: (data) => {
            console.log('Event created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllEvents'] })

        },
        onError: (error) => {
            console.error('Error creating event:', error);
        },
    });
};
