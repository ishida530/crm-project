import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(1, "Imię jest wymagane").max(255, "Imię jest za długie"),
});
