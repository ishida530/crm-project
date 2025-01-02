import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Investment, InvestmentsResponse } from '../types';

export const useEditInvestment = () => {
    const queryClient = useQueryClient();

    const editInvestment = async (investmentData: Investment): Promise<InvestmentsResponse> => {
        const response = await axiosInstance.put(`/investments/${investmentData.id}`, investmentData);
        return response.data;
    };

    return useMutation<InvestmentsResponse, Error, Investment>({
        mutationFn: editInvestment,
        onSuccess: (data) => {
            console.log('Investment updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllInvestments'] });
        },
        onError: (error) => {
            console.error('Error updating investment:', error);
        },
    });
};
