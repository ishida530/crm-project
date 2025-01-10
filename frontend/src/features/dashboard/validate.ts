import { z } from "zod";

export const formSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Tytuł wydarzenia jest wymagany." })
            .max(100, { message: "Tytuł może mieć maksymalnie 100 znaków." }),
        start_date: z
            .date()
            .refine((start) => !isNaN(start.getTime()), { message: "Nieprawidłowy format daty rozpoczęcia." }),
        end_date: z
            .date()
            .optional()
            .refine((end) => !end || !isNaN(end.getTime()), { message: "Nieprawidłowy format daty zakończenia." }),
        description: z
            .string()
            .min(1, { message: "Opis wydarzenia jest wymagany." })
            .max(500, { message: "Opis może mieć maksymalnie 500 znaków." }),
    })
    .refine((data) => {
        const startDate = data.start_date.getTime();
        const endDate = data.end_date ? data.end_date.getTime() : null;
        return !endDate || endDate > startDate;
    }, {
        path: ["end_date"],
        message: "Data zakończenia musi być późniejsza niż data rozpoczęcia.",
    });
