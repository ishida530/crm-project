import axiosInstance from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { ProjectResponse } from '../types';

const useGetProjectDetails = (projectId: number) => {
    const fetchProject = async (): Promise<ProjectResponse> => {
        const response = await axiosInstance.get(`/projects/${projectId}`);
        return response.data;
    }

    const { data, error, isLoading } = useQuery<ProjectResponse, Error>({
        queryKey: ['getProjectDetails', projectId],
        queryFn: fetchProject,
        enabled: !!projectId, 
    });

    return {
        data: data?.project,
        error,
        isLoading,
    };
};

export default useGetProjectDetails;
