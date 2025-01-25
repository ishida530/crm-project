import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { ProjectGroup, UpdateProjectGroupResponse } from '../types'; // Dostosowanie do typu ProjectGroup

export const useDeleteProjectGroup = () => {
    const deleteProjectGroup = async (groupData: ProjectGroup): Promise<UpdateProjectGroupResponse> => {
        console.log('groupData', groupData);
        const response = await axiosInstance.delete(`project-groups/${groupData}`); // Usuwanie grupy projektów po id
        return response.data;
    };

    const queryClient = useQueryClient();

    const { isError, data, mutate } = useMutation<UpdateProjectGroupResponse, Error, ProjectGroup>({
        mutationFn: deleteProjectGroup,
        onSuccess: (data) => {
            console.log('Grupa projektów usunięta pomyślnie:', data); // Komunikat po polsku
            queryClient.invalidateQueries({ queryKey: ['getAllProjectGroup'] }); // Zmieniono queryKey na 'getAllProjectGroup'
        },
        onError: (error) => {
            console.error('Błąd podczas usuwania grupy projektów:', error); // Komunikat o błędzie po polsku
        },
    });

    return {
        mutate,
        data,
        isError
    };
};
