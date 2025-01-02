import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteInvestmentResponse } from '../types';
import axiosInstance from '@/api/api';

const deleteInvestment = async (investmentId: number): Promise<DeleteInvestmentResponse> => {
    const response = await axiosInstance.delete(`/investments/${investmentId}`);
    return response.data;
};

export const useDeleteInvestment = () => {
    const queryClient = useQueryClient();

    const { mutate, isError, data, isPending } = useMutation<DeleteInvestmentResponse, Error, number>({
        mutationFn: deleteInvestment,
        onSuccess: (data) => {
            console.log('Investment deleted successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllInvestments'] });
        },
        onError: (error) => {
            console.error('Error deleting investment:', error);
        },
    });

    return {
        mutate,
        isError,
        data,
        isPending,
    };
};
