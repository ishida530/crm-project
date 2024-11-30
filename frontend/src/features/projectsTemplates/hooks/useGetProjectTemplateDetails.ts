import axiosInstance from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { ProjectTemplate } from '../types';

const useGetProjectTemplateDetails = (projectId: number) => {
    const fetchProjectTemplate = async (): Promise<ProjectTemplate> => {
        const response = await axiosInstance.get(`/project/templates/${projectId}`);
        return response.data;
    }

    const { data, error, isLoading } = useQuery<ProjectTemplate, Error>({
        queryKey: ['getProjectTemplateDetails'],
        queryFn: fetchProjectTemplate,
        enabled: !!projectId, 
    });

    return {
        data: data,
        error,
        isLoading,
    };
};

export default useGetProjectTemplateDetails;
