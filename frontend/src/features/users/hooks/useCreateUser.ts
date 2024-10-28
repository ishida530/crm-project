import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { RegisterUser, UpdateUserResponse } from '../types';


export const useCreateUser = () => {
    const queryClient = useQueryClient()

    const createUser = async (userData: RegisterUser): Promise<UpdateUserResponse> => {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    };


    return useMutation<UpdateUserResponse, Error, RegisterUser>({
        mutationFn: createUser,
        onSuccess: (data) => {
            console.log('User created successfully:', data);
            queryClient.invalidateQueries({ queryKey: ['getAllUsers'] })

        },
        onError: (error) => {
            console.error('Error creating user:', error);
        },
    });
};
