import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { RegisterCustomer, UpdateCustomerResponse } from '../types';

export const useCreateCustomer = () => {
    const queryClient = useQueryClient()

    const createCustomer = async (customerData: RegisterCustomer): Promise<UpdateCustomerResponse> => {
        const response = await axiosInstance.post('customers', customerData);
        return response.data;
    };

    return useMutation<UpdateCustomerResponse, Error, RegisterCustomer>({
        mutationFn: createCustomer,
        onSuccess: (data) => {
            console.log('Customer created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllCustomers'] });
        },
        onError: (error) => {
            console.error('Error creating customer:', error);
        },
    });
};