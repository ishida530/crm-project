import axiosInstance from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { ProjectsResponse } from '../types';



const useGetProjects = (includeArchived: boolean) => {

    const fetchProjects = async (): Promise<ProjectsResponse> => {
        const response = await axiosInstance.get(`projects?includeArchived=${includeArchived}`);
        return response.data;
    }

    const { data, error, isLoading } = useQuery<ProjectsResponse, Error>({
        queryKey: ['getAllProjects', includeArchived],
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
