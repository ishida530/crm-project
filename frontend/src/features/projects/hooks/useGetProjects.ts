import axiosInstance from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { ProjectsResponse } from '../types';



const useGetProjects = () => {
    
    const fetchProjects = async (): Promise<ProjectsResponse> => {
        const response = await axiosInstance.get('/projects');
        return response.data;
    }

    const { data, error, isLoading } = useQuery<ProjectsResponse, Error>({
        queryKey: ['getAllProjects'],
        queryFn: fetchProjects,


        staleTime: 300000,
    });

    return {
        projects: data?.projects,
        error,
        isLoading,
    };
};

export default useGetProjects;
