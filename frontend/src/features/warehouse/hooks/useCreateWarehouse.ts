import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { RegisterWarehouse, CreateWarehouseResponse } from '../types'

export const useCreateWarehouse = () => {
    const queryClient = useQueryClient();

    const createWarehouse = async (warehouseData: RegisterWarehouse): Promise<CreateWarehouseResponse> => {
        const response = await axiosInstance.post('warehouses', warehouseData);
        return response.data;
    };

    return useMutation<CreateWarehouseResponse, Error, RegisterWarehouse>({
        mutationFn: createWarehouse,
        onSuccess: (data) => {
            console.log('Warehouse created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllWarehouses'] })
        },
        onError: (error) => {
            console.error('Error creating warehouse:', error);
        },
    });
};
