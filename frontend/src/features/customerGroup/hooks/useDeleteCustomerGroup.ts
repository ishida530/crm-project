import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { CustomerGroup, UpdateCustomerGroupResponse } from '../types';

export const useDeleteCustomerGroup = () => {
    const updateCustomerGroup = async (groupData: CustomerGroup): Promise<UpdateCustomerGroupResponse> => {
        console.log('groupData', groupData);
        const response = await axiosInstance.put(`customer-group/${groupData.id}`, groupData);
        return response.data;
    };

    const queryClient = useQueryClient();

    const { isError, data, mutate } = useMutation<UpdateCustomerGroupResponse, Error, CustomerGroup>({
        mutationFn: updateCustomerGroup,
        onSuccess: (data) => {
            console.log('Customer group updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllCustomerGruop'] });
        },
        onError: (error) => {
            console.error('Error updating customer group:', error);
        },
    });

    return {
        mutate,
        data,
        isError
    };
};
