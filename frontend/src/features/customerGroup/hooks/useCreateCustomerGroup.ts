import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { RegisterCustomerGroup, UpdateCustomerGroupResponse } from '../types';

export const useCreateCustomerGroup = () => {
    const queryClient = useQueryClient();

    const createCustomerGroup = async (groupData: RegisterCustomerGroup): Promise<UpdateCustomerGroupResponse> => {
        const response = await axiosInstance.post('customer-group', groupData);
        return response.data;
    };

    return useMutation<UpdateCustomerGroupResponse, Error, RegisterCustomerGroup>({
        mutationFn: createCustomerGroup,
        onSuccess: (data) => {
            console.log('Customer group created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllCustomerGruop'] });
        },
        onError: (error) => {
            console.error('Error creating customer group:', error);
        },
    });
};
