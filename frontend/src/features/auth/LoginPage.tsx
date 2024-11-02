import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { formSchema } from './validate';
import { LoginCredentials } from './types';
import { useAuth } from './AuthProvier';
import { useNavigate } from 'react-router-dom';
import useAuthLogin from './useAuthLogin';


const LoginPage: React.FC = () => {
    const { handleLogin, isPending, error } = useAuthLogin();

    const { login } = useAuth()
    const navigate = useNavigate();
    const form = useForm<LoginCredentials>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: LoginCredentials) => {
        handleLogin(data);
        login();
        navigate('/')
    };

    return (
        <div className={`grow w-100 flex items-center justify-center  transition-all `}>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full dark:bg-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Log in</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </Form>

                {error && <p className="text-red-500 mt-2">{error.message}</p>}

            </div>
        </div>
    );
};

export default LoginPage;
