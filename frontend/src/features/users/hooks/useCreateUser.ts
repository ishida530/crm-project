import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { UpdateUserResponse, User } from './types'; // Importuj odpowiednie typy


export const useCreateUser = () => {


    const createUser = async (userData: User): Promise<UpdateUserResponse> => {
        const response = await axios.post('/api/users', userData); // Upewnij się, że endpoint jest poprawny
        return response.data;
    };


    return useMutation<UpdateUserResponse, Error, User>({
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
