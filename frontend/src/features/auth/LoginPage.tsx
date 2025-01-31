import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { formSchema } from './validate';
import { LoginCredentials } from './types';
import useAuthLogin from './useAuthLogin';
import { Link } from 'react-router-dom';
import { Loader } from '@/components/ui/loader';

const LoginPage: React.FC = () => {
    const { handleLogin, isPending, error, data: responseData } = useAuthLogin();

    const form = useForm<LoginCredentials>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginCredentials) => {
        await handleLogin(data);
        console.log('responseData', responseData);
    };

    return (
        <div className={`grow w-100 flex items-center justify-center transition-all`}>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full dark:bg-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
                    Zaloguj się
                </h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Wpisz swój adres email" {...field} />
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
                                    <FormLabel>Hasło</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Wpisz swoje hasło" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? <Loader isVisible /> : 'Zaloguj się'}
                        </Button>
                        <Link to={"/login/reset-password"}>Zresetuj hasło</Link>
                    </form>
                </Form>

                {error && <p className="text-red-500 mt-2">{error.message}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
