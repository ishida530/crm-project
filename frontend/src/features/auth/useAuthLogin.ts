import axiosInstance from '@/api/api';
import { LoginCredentials, LoginResponseType } from './types';
import { useMutation } from '@tanstack/react-query';




const useAuthLogin = () => {

    const login = async (credentials: LoginCredentials): Promise<LoginResponseType> => {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    }

    const { mutate: handleLogin, data, isPending, error } = useMutation({
        mutationFn: login,
        onSuccess: ({ token, role }) => {
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)
        }
    })

    return {
        handleLogin,
        data,
        isPending,
        error,
    };
};


export default useAuthLogin;
