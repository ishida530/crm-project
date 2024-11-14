import { z } from "zod";

export const formSchema = z
    .object({
        title: z
            .string()
            .min(1, { message: "Tytuł wydarzenia jest wymagany." })
            .max(100, { message: "Tytuł może mieć maksymalnie 100 znaków." }),
        start: z
            .string()
            .refine((start) => !isNaN(new Date(start).getTime()), { message: "Nieprawidłowy format daty rozpoczęcia." })
            .transform((start) => new Date(start)), 
        end: z
            .string()
            .optional()
            .refine((end) => !end || !isNaN(new Date(end).getTime()), { message: "Nieprawidłowy format daty zakończenia." })
            .transform((end) => (end ? new Date(end) : undefined)), 
        description: z
            .string()
            .min(1, { message: "Opis wydarzenia jest wymagany." })
            .max(500, { message: "Opis może mieć maksymalnie 500 znaków." }),
    })
    .refine((data) => {
        
        const startDate = data.start.getTime();
        const endDate = data.end ? data.end.getTime() : null;

        return !endDate || endDate > startDate;
    }, {
        path: ["end"],
        message: "Data zakończenia musi być późniejsza niż data rozpoczęcia.",
    });
