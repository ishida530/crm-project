import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    role: z.string().min(1, { message: 'Role is required' }),
});
