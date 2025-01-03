import { useMutation, useQueryClient } from '@tanstack/react-query';
import {  Vehicle } from '../types';
import axiosInstance from '@/api/api';

export const useUpdateVehicle = () => {

    const updateVehicle = async (vehicleId: number, vehicleData: Vehicle): Promise<Vehicle> => {
        const response = await axiosInstance.put(`/vehicles/${vehicleId}`, vehicleData);
        return response.data;
    };

    const queryClient = useQueryClient();

    const { isError, data, isPending, mutate } = useMutation<Vehicle, Error, { vehicleId: number; vehicleData: Vehicle }>({
        mutationFn: ({ vehicleId, vehicleData }) => updateVehicle(vehicleId, vehicleData),
        onSuccess: (data) => {
            console.log('Vehicle updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllVehicles'] });
        },
        onError: (error) => {
            console.error('Error updating vehicle:', error);
        },
    });

    return {
        mutate,
        data,
        isPending,
        isError,
    };
};
