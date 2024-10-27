import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { RegisterUser, UpdateUserResponse } from '../types';


export const useCreateUser = () => {


    const createUser = async (userData: RegisterUser): Promise<UpdateUserResponse> => {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    };


    return useMutation<UpdateUserResponse, Error, RegisterUser>({
        mutationFn: createUser,
        onSuccess: (data) => {
            console.log('User created successfully:', data);
            // Możesz tu dodać logikę, np. odświeżenie listy użytkowników
        },
        onError: (error) => {
            console.error('Error creating user:', error);
        },
    });
};
