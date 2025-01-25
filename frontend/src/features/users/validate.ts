import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(1, { message: 'Imię jest wymagane' }),
    email: z.string().email({ message: 'Nieprawidłowy adres email' }),
    phoneNumber: z.string().trim().optional(), 
    role: z.string().min(1, { message: 'Rola jest wymagana' }),
});
