import { z } from 'zod';

export const formSchema = z.object({
    contact_name: z.string().min(1, { message: 'Nazwa kontaktu jest wymagana' }),
    email: z.string().email({ message: 'Nieprawidłowy adres email' }),
    address: z.string().min(1, { message: 'Adres jest wymagany' }),
    nip: z.string()
        .length(10, { message: 'NIP musi mieć dokładnie 10 cyfr' })
        .regex(/^\d+$/, { message: 'NIP może zawierać tylko cyfry' }),
    website: z.string().trim().optional(),
    group: z.number().optional()
});
