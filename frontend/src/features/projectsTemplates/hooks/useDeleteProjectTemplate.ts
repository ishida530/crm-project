import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { DeleteProjectTemplateResponse } from '../types';

const deleteProjectTemplate = async (projectTemplateId: number): Promise<DeleteProjectTemplateResponse> => {
    const response = await axiosInstance.delete(`project/templates/${projectTemplateId}`);
    return response.data;
};

export const useDeleteProjectTemplate = () => {
    const queryClient = useQueryClient();
    const { mutate, isError, data, isPending } = useMutation<DeleteProjectTemplateResponse, Error, number>({
        mutationFn: deleteProjectTemplate,
        onSuccess: (data) => {
            console.log('Project template deleted successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllProjectTemplates'] });
        },
        onError: (error) => {
            console.error('Error deleting project template:', error);
        },
    });

    return {
        mutate,
        isError,
        data,
        isPending,
    };
};
