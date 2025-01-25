import { z } from 'zod';

export const productSchema = z.object({
    producer: z.string().min(1, "Producent jest wymagany"),
    name: z.string().min(1, "Nazwa produktu jest wymagana"),
    quantity: z.number().min(1, "Ilość musi być liczbą dodatnią").int("Ilość musi być liczbą całkowitą"),
    unit_of_measure: z.string().min(1, "Jednostka miary jest wymagana"),
});
