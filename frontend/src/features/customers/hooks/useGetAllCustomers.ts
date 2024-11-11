import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { CustomerListResponse } from '../types';

const useGetAllCustomers = () => {
  const fetchCustomers = async (): Promise<CustomerListResponse> => {
    const response = await axiosInstance.get('customers');
    return response.data;
  };

  const { data, error, isLoading } = useQuery<CustomerListResponse, Error>({
    queryKey: ['getAllCustomers'],
    queryFn: fetchCustomers,
    staleTime: 300000, 
  });

  return {
    customers: data, 
    error,
    isLoading,
  };
};

export default useGetAllCustomers;
