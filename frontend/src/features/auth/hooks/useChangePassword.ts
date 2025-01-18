import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { ChangePasswordRequest, ChangePasswordResponse } from '../types'; // Define types for change password request/response

export const useChangePassword = () => {
    // Zmieniamy funkcję, aby akceptowała obiekt jako argument
    const changePassword = async (data: { userId: number, data: ChangePasswordRequest }): Promise<ChangePasswordResponse> => {
        const response = await axiosInstance.put(`/change-password/${data.userId}`, data.data);
        return response.data;
    };

    return useMutation<ChangePasswordResponse, Error, { userId: number, data: ChangePasswordRequest }>({
        mutationFn: changePassword, // Teraz funkcja przyjmuje obiekt z userId i data
        onSuccess: (data) => {
            console.log('Password changed successfully:', data.message);
            // Możesz tu dodać logikę po pomyślnym zaktualizowaniu hasła
        },
        onError: (error) => {
            console.error('Error changing password:', error.message);
        },
    });
};
