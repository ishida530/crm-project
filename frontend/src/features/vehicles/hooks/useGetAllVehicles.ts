import { useQuery } from '@tanstack/react-query';
import { VehicleListResponse } from '../types';
import axiosInstance from '@/api/api';

const useGetAllVehicles = () => {
    const fetchVehicles = async (): Promise<VehicleListResponse> => {
        const response = await axiosInstance.get('/vehicles');
        return response.data;
    };

    const { data, error, isLoading } = useQuery<VehicleListResponse, Error>({
        queryKey: ['getAllVehicles'],
        queryFn: fetchVehicles,
        staleTime: 300000,
    });

    return {
        vehicles: data,
        error,
        isLoading,
    };
};

export default useGetAllVehicles;
