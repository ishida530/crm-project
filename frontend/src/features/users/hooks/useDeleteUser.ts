import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteUserResponse } from '../types';
import axiosInstance from '@/api/api';

const deleteUser = async (userId: number): Promise<DeleteUserResponse> => {
    const response = await axiosInstance.delete(`/admin/delete/${userId}`);
    return response.data;
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    const { mutate, isError, data, isPending } = useMutation<DeleteUserResponse, Error, number>({
        mutationFn: deleteUser,
        onSuccess: (data) => {
            console.log('User deleted successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllUsers'] })
        },
        onError: (error) => {
            console.error('Error deleting user:', error);
        },
    });

    return {
        mutate,
        isError,
        data,
        isPending,
    };
};
