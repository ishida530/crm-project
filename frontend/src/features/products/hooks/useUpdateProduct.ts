import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { UpdateProductResponse } from '../types';
import { Product } from '@/features/warehouse/types';

export const useUpdateProduct = () => {

    const updateProduct = async (productData: Product): Promise<UpdateProductResponse> => {
        console.log('productData', productData);
        const response = await axiosInstance.put(`products/${productData.id}`, productData);
        return response.data;
    };

    const queryClient = useQueryClient();

    const { isError, data, mutate } = useMutation<UpdateProductResponse, Error, Product>({
        mutationFn: updateProduct,
        onSuccess: (data) => {
            console.log('Product updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getWarehouseDetails'] });
            queryClient.invalidateQueries({ queryKey: ['getAllProducts'] });
        },
        onError: (error) => {
            console.error('Error updating product:', error);
        },
    });

    return {
        mutate,
        data,
        isError
    };
};
