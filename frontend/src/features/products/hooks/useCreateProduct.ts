import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Product } from '@/features/warehouse/types';

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    const createProduct = async (productData: Product): Promise<Product> => {
        const response = await axiosInstance.post('products', productData);
        return response.data;
    };

    return useMutation<Product, Error, Product>({
        mutationFn: createProduct,
        onSuccess: (data) => {
            console.log('Product created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getWarehouseDetails'] });
        },
        onError: (error) => {
            console.error('Error creating product:', error);
        },
    });
};
