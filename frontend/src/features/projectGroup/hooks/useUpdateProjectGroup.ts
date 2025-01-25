import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';  // Używamy tej samej instancji axios
import { ProjectGroup, UpdateProjectGroupResponse } from '../types'; // Typy dla grup projektów

export const useUpdateProjectGroup = () => {
    const updateProjectGroup = async (groupData: ProjectGroup): Promise<UpdateProjectGroupResponse> => {
        console.log('groupData', groupData);
        const response = await axiosInstance.put(`project-groups/${groupData.id}`, groupData); // Zmieniony endpoint
        return response.data;
    };

    const queryClient = useQueryClient();

    const { isError, data, mutate } = useMutation<UpdateProjectGroupResponse, Error, ProjectGroup>({
        mutationFn: updateProjectGroup,
        onSuccess: (data) => {
            console.log('Grupa projektów zaktualizowana pomyślnie:', data); // Komunikat po polsku
            queryClient.invalidateQueries({ queryKey: ['getAllProjectGroup'] }); // Zmieniony queryKey
        },
        onError: (error) => {
            console.error('Błąd podczas aktualizacji grupy projektów:', error); // Komunikat po polsku
        },
    });

    return {
        mutate,
        data,
        isError
    };
};
