import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { ProjectGroup } from '../types';

export const useCreateProjectGroup = () => {
    const queryClient = useQueryClient();

    const createProjectGroup = async (groupData: ProjectGroup): Promise<ProjectGroup> => {

        const response = await axiosInstance.post('project-groups', groupData);
        return response.data;
    };

    return useMutation<ProjectGroup, Error, ProjectGroup>({
        mutationFn: createProjectGroup,
        onSuccess: (data) => {
            console.log('Grupa projektów utworzona pomyślnie:', data); // Komunikat w języku polskim
            queryClient.invalidateQueries({ queryKey: ['getAllProjectGroup'] }); // Zmieniono nazwę zapytania
        },
        onError: (error) => {
            console.error('Błąd podczas tworzenia grupy projektów:', error); // Komunikat o błędzie po polsku
        },
    });
};
