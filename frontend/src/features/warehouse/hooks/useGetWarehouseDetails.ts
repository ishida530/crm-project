import axiosInstance from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { Warehouse } from '../types';

const useGetWarehouseDetails = (warehouseId: number) => {
    const fetchWarehouseDetails = async (): Promise<Warehouse> => {
        const response = await axiosInstance.get(`/warehouses/${warehouseId}`);
        return response.data;
    };

    const { data, error, isLoading } = useQuery<Warehouse, Error>({
        queryKey: ['getWarehouseDetails', warehouseId],
        queryFn: fetchWarehouseDetails,
        enabled: !!warehouseId,
    });

    return {
        data,
        error,
        isLoading,
    };
};

export default useGetWarehouseDetails;
