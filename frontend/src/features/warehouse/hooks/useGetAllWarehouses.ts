import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Warehouse } from '../types'; 

const useGetAllWarehouses = () => {
  const fetchWarehouses = async (): Promise<Warehouse[]> => {
    const response = await axiosInstance.get('warehouses'); 
    return response.data;
  };

  const { data, error, isLoading } = useQuery<Warehouse[], Error>({
    queryKey: ['getAllWarehouses'], 
    queryFn: fetchWarehouses,
    staleTime: 300000, 
  });

  return {
    warehouses: data,
    error,
    isLoading,
  };
};

export default useGetAllWarehouses;
