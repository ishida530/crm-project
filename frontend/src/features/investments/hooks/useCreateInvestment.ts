import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Investment, InvestmentsResponse, } from '../types';

export const useCreateInvestment = () => {
    const queryClient = useQueryClient()

    const createInvestment = async (investmentData: Investment): Promise<InvestmentsResponse> => {
        const response = await axiosInstance.post('/investments', investmentData);
        return response.data;
    };

    return useMutation<InvestmentsResponse, Error, Investment>({
        mutationFn: createInvestment,
        onSuccess: (data) => {
            console.log('Investment created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllInvestments'], refetchType: 'active' });
            console.log('queryClient powinon?')
        },
        onError: (error) => {
            console.error('Error creating investment:', error);
        },
    });
};
