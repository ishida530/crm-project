import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Warehouse, UpdateWarehouseResponse } from '../types';

export const useUpdateWarehouse = () => {

    const updateWarehouse = async (warehouseData: Warehouse): Promise<UpdateWarehouseResponse> => {
        console.log('warehouseData', warehouseData);
        const response = await axiosInstance.put(`warehouses/${warehouseData.id}`, warehouseData);
        return response.data;
    };

    const queryClient = useQueryClient();

    const { isError, data, mutate } = useMutation<UpdateWarehouseResponse, Error, Warehouse>({
        mutationFn: updateWarehouse,
        onSuccess: (data) => {
            console.log('Warehouse updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllWarehouses'] });
        },
        onError: (error) => {
            console.error('Error updating warehouse:', error);
        },
    });

    return {
        mutate,
        data,
        isError
    };
};
