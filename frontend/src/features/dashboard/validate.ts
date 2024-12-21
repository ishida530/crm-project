import { z } from "zod";

export const formSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Tytuł wydarzenia jest wymagany." })
            .max(100, { message: "Tytuł może mieć maksymalnie 100 znaków." }),
        startDate: z
            .date()
            .refine((start) => !isNaN(start.getTime()), { message: "Nieprawidłowy format daty rozpoczęcia." }),
        endDate: z
            .date()
            .optional()
            .refine((end) => !end || !isNaN(end.getTime()), { message: "Nieprawidłowy format daty zakończenia." }),
        description: z
            .string()
            .min(1, { message: "Opis wydarzenia jest wymagany." })
            .max(500, { message: "Opis może mieć maksymalnie 500 znaków." }),
    })
    .refine((data) => {
        const startDate = data.startDate.getTime();
        const endDate = data.endDate ? data.endDate.getTime() : null;
        return !endDate || endDate > startDate;
    }, {
        path: ["endDate"],
        message: "Data zakończenia musi być późniejsza niż data rozpoczęcia.",
    });
