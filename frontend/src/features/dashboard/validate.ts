import { z } from "zod";

export const formSchema = z
    .object({
        title: z
            .string()
            .min(1, { message: "Tytuł wydarzenia jest wymagany." })
            .max(100, { message: "Tytuł może mieć maksymalnie 100 znaków." }),
        start: z
            .date()
            .refine((date) => !isNaN(date.getTime()), { message: "Nieprawidłowy format daty rozpoczęcia." }),
        end: z
            .date()
            .optional()
            .refine((date) => !isNaN(date?.getTime() || NaN), { message: "Nieprawidłowy format daty zakończenia." }),
        description: z
            .string()
            .min(1, { message: "Opis wydarzenia jest wymagany." })
            .max(500, { message: "Opis może mieć maksymalnie 500 znaków." }),
    })
    .refine((data) => {
        const startDate = new Date(data.start).getTime();
        const endDate = data.end ? new Date(data.end).getTime() : null;

        return !endDate || endDate > startDate;
    }, {
        path: ["end"],
        message: "Data zakończenia musi być późniejsza niż data rozpoczęcia.",
    });
