import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { changePasswordSchema } from './validate'; // Schemat walidacji
import { ChangePasswordRequest } from './types'; // Typ danych
import { useChangePassword } from './hooks/useChangePassword';

// Zaktualizowana struktura formularza
const ChangePasswordPage: React.FC = () => {
    const { mutate: handleChangePassword, isPending, error, isSuccess,data } = useChangePassword();

    const form = useForm<ChangePasswordRequest>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            current_password: '',
            new_password: '',
            confirm_password: '',
        },
    });

    // Funkcja obsługi przesyłania formularza
    const onSubmit = async (data: ChangePasswordRequest) => {
        const requestData = {
            userId: Number(localStorage.getItem('userId')), // Pobranie userId z localStorage
            data: {
                current_password: data.current_password,
                new_password: data.new_password,
                confirm_password: data.confirm_password
            }
        }

        handleChangePassword(requestData);
    };

    return (
        <div className="grow w-full flex items-center justify-center transition-all">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full dark:bg-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
                    Zmień hasło
                </h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Obecne hasło */}
                        <FormField
                            control={form.control}
                            name="current_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Obecne hasło</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Wpisz obecne hasło" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Nowe hasło */}
                        <FormField
                            control={form.control}
                            name="new_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nowe hasło</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Wpisz nowe hasło" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Potwierdź hasło */}
                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Potwierdź hasło</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Potwierdź nowe hasło"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Przycisk submit */}
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? 'Wysyłanie...' : 'Zmień hasło'}
                        </Button>
                    </form>
                </Form>

                {/* Komunikaty o błędach i sukcesach */}
                {error && <p className="text-red-500 mt-2">{error.message}</p>}
                {isSuccess&& data?.statusCode !== 500 && (
                    <p className="text-green-500 mt-2">
                        Twoje hasło zostało pomyślnie zmienione.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChangePasswordPage;
