import { z } from 'zod';

export const formSchema = z.object({
    name: z
        .string()
        .min(1, "Nazwa grupy projektów jest wymagana") // Walidacja - minimalna długość
        .max(255, "Nazwa grupy projektów jest za długa"), // Walidacja - maksymalna długość
    
    project_template_id: z
        .number()
        .min(1, "Wybierz szablon projektu") // Walidacja, jeśli nie jest wybrany żaden szablon
});
