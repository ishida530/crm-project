import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Customer, } from '../types';

const useGetAllCustomers = () => {
  const fetchCustomers = async (): Promise<Customer[]> => {
    const response = await axiosInstance.get('customers');
    return response.data;
  };

  const { data, error, isLoading } = useQuery<Customer[], Error>({
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
