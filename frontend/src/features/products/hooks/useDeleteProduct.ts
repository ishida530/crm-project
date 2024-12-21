import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { DeleteProductResponse } from '../types';

const deleteProduct = async (productId: number): Promise<DeleteProductResponse> => {
    const response = await axiosInstance.delete(`products/${productId}`);
    return response.data;
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    const { mutate, isError, data, isPending } = useMutation<DeleteProductResponse, Error, number>({
        mutationFn: deleteProduct,
        onSuccess: (data) => {
            console.log('Product deleted successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getWarehouseDetails'] });
            queryClient.invalidateQueries({ queryKey: ['getAllProducts'] });

        },
        onError: (error) => {
            console.error('Error deleting product:', error);
        },
    });

    return {
        mutate,
        isError,
        data,
        isPending,
    };
};
