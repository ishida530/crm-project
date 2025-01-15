import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { ResetPasswordRequest, ResetPasswordResponse } from '../types';

// Define the request type


export const useResetPassword = () => {
    const resetPassword = async (email: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
        const response = await axiosInstance.post('/auth/reset-password', email, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    };

    return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            console.log('Password reset link sent successfully:', data.message);
            // Add additional logic here, like showing a toast notification
        },
        onError: (error) => {
            console.error('Error sending password reset link:', error.message);
        },
    });
};
