import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { resetPasswordSchema } from './validate'; // Zdefiniuj schemat walidacji dla adresu email
import { ResetPasswordRequest } from './types'; // Zdefiniuj typ danych dla żądania resetu hasła
import { Link } from 'react-router-dom';
import { useResetPassword } from './hooks/useResetPassword';

const ResetPasswordPage: React.FC = () => {
    const { mutate:handleResetPassword, isPending, error, success } = useResetPassword();

    const form = useForm<ResetPasswordRequest>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: ResetPasswordRequest) => {
        await handleResetPassword(data);
    };

    return (
        <div className={`grow w-100 flex items-center justify-center transition-all`}>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full dark:bg-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
                    Zresetuj hasło
                </h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adres email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Wpisz swój adres email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? 'Wysyłanie...' : 'Wyślij link resetujący'}
                        </Button>
                    </form>
                </Form>

                {error && <p className="text-red-500 mt-2">{error.message}</p>}
                {success && (
                    <p className="text-green-500 mt-2">
                        Link do resetu hasła został wysłany na Twój adres email.
                    </p>
                )}

                <div className="mt-4 text-center">
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Powrót do logowania
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
