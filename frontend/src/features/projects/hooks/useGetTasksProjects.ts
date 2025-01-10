import axiosInstance from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { ProjectResponse, Task } from '../types';

const useGetTasksProjects = (projectId: number) => {
    const fetchProjectTask = async (): Promise<Task[]> => {
        const response = await axiosInstance.get(`/projects/tasks/project/${projectId}`);

        return response.data;
    }

    const { data, error, isLoading } = useQuery<Task[], Error>({
        queryKey: ['getProjectDetailsTasks', projectId],
        queryFn: fetchProjectTask,
        enabled: !!projectId,
    });

    return {
        data,
        error,
        isLoading,
    };
};

export default useGetTasksProjects;
