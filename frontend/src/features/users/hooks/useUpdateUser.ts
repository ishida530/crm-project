import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateUserResponse, User } from '../types';
import axiosInstance from '@/api/api';


export const useUpdateUser = () => {

    const updateUser = async (userId: number, userData: User): Promise<UpdateUserResponse> => {
        const response = await axiosInstance.put(`/admin/update/${userId}`, userData);
        return response.data;
    };
    const queryClient = useQueryClient()

    const { isError, data, isPending, mutate } = useMutation<UpdateUserResponse, Error, { userId: number; userData: User }>({
        mutationFn: ({ userId, userData }) => updateUser(userId, userData),
        onSuccess: (data) => {
            console.log('User updated successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllUsers'] })
        },
        onError: (error) => {
            console.error('Error updating user:', error);
        },
    });

    return {
        mutate,
        data,
        isPending,
        isError
    }
};

