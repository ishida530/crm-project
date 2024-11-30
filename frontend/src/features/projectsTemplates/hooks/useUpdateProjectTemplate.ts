import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { ProjectTemplate, UpdateProjectTemplateResponse } from '../types';

export const useUpdateProjectTemplate = () => {

    const updateProjectTemplate = async (projectTemplateData: ProjectTemplate): Promise<UpdateProjectTemplateResponse> => {
        console.log('projectTemplateData', projectTemplateData);
        const response = await axiosInstance.put(`project/templates/${projectTemplateData.id}`, projectTemplateData);
        return response.data;
    };

    const queryClient = useQueryClient();

    const { isError, data, mutate } = useMutation<UpdateProjectTemplateResponse, Error, ProjectTemplate>({
        mutationFn: updateProjectTemplate,
        onSuccess: (data) => {
            console.log('Project template updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllProjectTemplates'] }); // Zaktualizuj zapytanie po sukcesie
        },
        onError: (error) => {
            console.error('Error updating project template:', error);
        },
    });

    return {
        mutate,
        data,
        isError
    };
};
