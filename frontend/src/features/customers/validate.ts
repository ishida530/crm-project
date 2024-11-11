import { z } from 'zod';

export const formSchema = z.object({
    contactName: z.string().min(1, { message: 'Contact Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    address: z.string().min(1, { message: 'Address is required' }),
    nip: z.string().length(10, { message: 'NIP must be exactly 10 digits' }).regex(/^\d+$/, { message: 'NIP must contain only numbers' }),
    website: z.string().optional()
});
