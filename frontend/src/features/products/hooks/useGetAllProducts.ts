import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Product } from '../types'; // Make sure to import the Product type

const useGetAllProducts = () => {
    const fetchProducts = async (): Promise<Product[]> => {
        const response = await axiosInstance.get('products');
        return response.data;
    };

    const { data, error, isLoading } = useQuery<Product[], Error>({
        queryKey: ['getAllProducts'], 
        queryFn: fetchProducts,
        staleTime: 300000,
    });

    return {
        products: data, 
        error,
        isLoading,
    };
};

export default useGetAllProducts;
