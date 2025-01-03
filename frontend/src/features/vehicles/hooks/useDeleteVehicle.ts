import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';

const deleteVehicle = async (vehicleId: number): Promise<void> => {
    await axiosInstance.delete(`/vehicles/${vehicleId}`);
};

export const useDeleteVehicle = () => {
    const queryClient = useQueryClient();
    
    const { mutate, isError, data, isPending } = useMutation<void, Error, number>({
        mutationFn: deleteVehicle,
        onSuccess: () => {
            console.log('Vehicle deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['getAllVehicles'] });
        },
        onError: (error) => {
            console.error('Error deleting vehicle:', error);
        },
    });

    return {
        mutate,
        isError,
        data,
        isPending,
    };
};
