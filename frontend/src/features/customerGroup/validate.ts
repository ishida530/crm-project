import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name is too long"),
});
