import axiosInstance from '@/api/api';
import { LoginCredentials } from './types';
import { useMutation } from '@tanstack/react-query';

const useAuth = () => {
    const login = async (credentials: LoginCredentials): Promise<unknown> => {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    }

    const { mutate: handleLogin, data, isPending, error } = useMutation({
        mutationFn: login,
        onSuccess:(data)=>{
            console.log(data)
        }
    })
    return {
        handleLogin,
        data,
        isPending,
        error,
    };
};

export default useAuth;
