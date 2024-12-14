import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { DeleteWarehouseResponse } from '../types';

const deleteWarehouse = async (warehouseId: number): Promise<DeleteWarehouseResponse> => {
    const response = await axiosInstance.delete(`warehouses/${warehouseId}`); 
    return response.data;
};

export const useDeleteWarehouse = () => {
    const queryClient = useQueryClient();
    
    const { mutate, isError, data, isPending } = useMutation<DeleteWarehouseResponse, Error, number>({
        mutationFn: deleteWarehouse,
        onSuccess: (data) => {
            console.log('Warehouse deleted successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllWarehouses'] }); 
        },
        onError: (error) => {
            console.error('Error deleting warehouse:', error);
        },
    });

    return {
        mutate,
        isError,
        data,
        isPending,
    };
};
