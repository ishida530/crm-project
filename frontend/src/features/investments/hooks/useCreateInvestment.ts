import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { Investment, CreateInvestmentResponse } from '../types';

export const useCreateInvestment = () => {
    const queryClient = useQueryClient()

    const createInvestment = async (investmentData: Investment): Promise<CreateInvestmentResponse> => {
        const response = await axiosInstance.post('/investments', investmentData);
        return response.data;
    };

    return useMutation<CreateInvestmentResponse, Error, Investment>({
        mutationFn: createInvestment,
        onSuccess: (data) => {
            console.log('Investment created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllInvestments'] })
        },
        onError: (error) => {
            console.error('Error creating investment:', error);
        },
    });
};
