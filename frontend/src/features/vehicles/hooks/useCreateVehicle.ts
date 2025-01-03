import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Vehicle } from '../types';

export const useCreateVehicle = () => {
    const queryClient = useQueryClient();

    const createVehicle = async (vehicleData: Vehicle): Promise<Vehicle> => {
        const response = await axiosInstance.post('/vehicles', vehicleData);
        return response.data;
    };

    return useMutation<Vehicle, Error, Vehicle>({
        mutationFn: createVehicle,
        onSuccess: (data) => {
            console.log('Vehicle created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllVehicles'] });
        },
        onError: (error) => {
            console.error('Error creating vehicle:', error);
        },
    });
};
