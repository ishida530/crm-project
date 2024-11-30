import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';  
import { ProjectTemplate, UpdateProjectTemplateResponse } from '../types';


export const useCreateProjectTemplate = () => {
    const queryClient = useQueryClient();

    const createProjectTemplate = async (projectTemplateData: ProjectTemplate): Promise<UpdateProjectTemplateResponse> => {
        const response = await axiosInstance.post('project/templates', projectTemplateData);
        return response.data;
    };

    return useMutation<UpdateProjectTemplateResponse, Error, ProjectTemplate>({
        mutationFn: createProjectTemplate,
        onSuccess: (data) => {
            console.log('Project Template created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllProjectTemplates'] });
        },
        onError: (error) => {
            console.error('Error creating project template:', error);
        },
    });
};
