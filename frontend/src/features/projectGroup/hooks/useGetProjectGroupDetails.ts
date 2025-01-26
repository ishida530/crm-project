import axiosInstance from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { ProjectGroupResponse } from '../types'; // Zakładając, że masz taki typ danych

const useGetProjectGroupDetails = (projectGroupId: number) => {
    const fetchProjectGroup = async (): Promise<ProjectGroupResponse> => {
        const response = await axiosInstance.get(`/project-groups/${projectGroupId}`);
        return response.data;
    };

    const { data, error, isLoading } = useQuery<ProjectGroupResponse, Error>({
        queryKey: ['getProjectGroupDetails', projectGroupId],
        queryFn: fetchProjectGroup,
        enabled: !!projectGroupId, // Hook będzie aktywowany tylko, gdy projectGroupId jest dostępne
    });

    return {
        data, // Zwróć dane dotyczące grupy projektów
        error,
        isLoading,
    };
};

export default useGetProjectGroupDetails;
