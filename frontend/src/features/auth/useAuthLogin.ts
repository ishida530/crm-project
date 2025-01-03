import axiosInstance from '@/api/api';
import { LoginCredentials, LoginResponseType } from './types';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from './AuthProvier';
import { useNavigate } from 'react-router-dom';




const useAuthLogin = () => {
    const { login } = useAuth()
    const navigate = useNavigate();
    const loginReuest = async (credentials: LoginCredentials): Promise<LoginResponseType> => {
        console.log('credentials', credentials)
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    }

    const { mutate: handleLogin, data, isPending, error } = useMutation({
        mutationFn: loginReuest,
        onSuccess: ({ token, role, user_id }) => {
            if (role) {
                localStorage.setItem('token', token)
                localStorage.setItem('role', role)
                localStorage.setItem('userId', user_id)
                login()
                navigate('/')
            } else {
                throw new Error('Logowanie nieudane. Spróbuj ponownie.');

            }
        },
    })

    return {
        handleLogin,
        data,
        isPending,
        error,
    };
};


export default useAuthLogin;
