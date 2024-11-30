import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { ProjectTemplateListResponse } from '../types'; // Zaktualizuj odpowiedni typ

const useGetAllProjectTemplates = () => {
  const fetchProjectTemplates = async (): Promise<ProjectTemplateListResponse> => {
    const response = await axiosInstance.get('project/templates');
    return response.data;
  };

  const { data, error, isLoading } = useQuery<ProjectTemplateListResponse, Error>({
    queryKey: ['getAllProjectTemplates'],
    queryFn: fetchProjectTemplates,
    staleTime: 300000,
  });

  return {
    projectTemplates: data,
    error,
    isLoading,
  };
};

export default useGetAllProjectTemplates;
