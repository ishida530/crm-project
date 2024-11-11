import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Customer, UpdateCustomerResponse } from '../types';

export const useUpdateCustomer = () => {

    const updateCustomer = async (customerData: Customer): Promise<UpdateCustomerResponse> => {
        console.log('customerData', customerData)
        const response = await axiosInstance.put(`customers/${customerData.id}`, customerData);
        return response.data;
    };

    const queryClient = useQueryClient();

    const { isError, data, isPending, mutate } = useMutation<UpdateCustomerResponse, Error, Customer>({
        mutationFn: updateCustomer,
        onSuccess: (data) => {
            console.log('Customer updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllCustomers'] });
        },
        onError: (error) => {
            console.error('Error updating customer:', error);
        },
    });

    return {
        mutate,
        data,
        isPending,
        isError
    };
};
