import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { RegisterProjectGroup, UpdateProjectGroupResponse } from '../types'; // Dostosuj do typu grupy projektów

export const useCreateProjectGroup = () => {
    const queryClient = useQueryClient();

    const createProjectGroup = async (groupData: RegisterProjectGroup): Promise<UpdateProjectGroupResponse> => {
        const response = await axiosInstance.post('project-groups', groupData); // Zmieniono endpoint na 'project-group'
        return response.data;
    };

    return useMutation<UpdateProjectGroupResponse, Error, RegisterProjectGroup>({
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
