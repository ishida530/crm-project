import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { ProjectGroup } from '../types'; // Dostosowanie do typu ProjectGroup

const useGetAllProjectGroups = () => {
    const fetchProjectGroups = async (): Promise<ProjectGroup[]> => {
        const response = await axiosInstance.get('/project-groups'); // Zmieniony endpoint
        return response.data;
    };

    const { data, error, isLoading } = useQuery<ProjectGroup[], Error>({
        queryKey: ['getAllProjectGroup'], // Zmieniony queryKey na 'getAllProjectGroup'
        queryFn: fetchProjectGroups,
        staleTime: 300000, // Czas przechowywania danych w pamięci podręcznej
    });

    return {
        projectGroups: data,
        error,
        isLoading,
    };
};

export default useGetAllProjectGroups;
