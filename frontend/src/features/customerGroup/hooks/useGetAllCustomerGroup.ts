import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { CustomerGroup } from '../types';

const useGetAllCustomersGroup = () => {
    const fetchCustomersGroup = async (): Promise<CustomerGroup[]> => {
        const response = await axiosInstance.get('/customer-group');
        return response.data;
    };

    const { data, error, isLoading } = useQuery<CustomerGroup[], Error>({
        queryKey: ['getAllCustomerGruop'],
        queryFn: fetchCustomersGroup,
        staleTime: 300000,
    });
    return {
        customersGroup: data,
        error,
        isLoading,
    };
};

export default useGetAllCustomersGroup;
