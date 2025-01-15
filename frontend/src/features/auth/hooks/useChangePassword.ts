import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/api';
import { ChangePasswordRequest, ChangePasswordResponse } from '../types'; // Define types for change password request/response


export const useChangePassword = () => {
    const changePassword = async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
        const response = await axiosInstance.post('/auth/change-password',data);
        return response.data;
    };

    return useMutation<ChangePasswordResponse, Error, ChangePasswordRequest>({
        mutationFn: changePassword,
        onSuccess: (data) => {
            console.log('Password changed successfully:', data.message);
            // Add additional logic here, like showing a toast notification
        },
        onError: (error) => {
            console.error('Error changing password:', error.message);
        },
    });
};
