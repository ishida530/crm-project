import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { DeleteCustomerResponse } from '../types';

const deleteCustomer = async (customerId: number): Promise<DeleteCustomerResponse> => {
    const response = await axiosInstance.delete(`customers/${customerId}`);
    return response.data;
};

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();
    const { mutate, isError, data, isPending } = useMutation<DeleteCustomerResponse, Error, number>({
        mutationFn: deleteCustomer,
        onSuccess: (data) => {
            console.log('Customer deleted successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllCustomers'] });
        },
        onError: (error) => {
            console.error('Error deleting customer:', error);
        },
    });

    return {
        mutate,
        isError,
        data,
        isPending,
    };
};
