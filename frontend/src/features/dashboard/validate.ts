import { z } from "zod";

export const formSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Tytuł wydarzenia jest wymagany." })
            .max(100, { message: "Tytuł może mieć maksymalnie 100 znaków." }),
        start_date: z
            .string()
            .optional(),
        end_date: z
            .string()
            .optional(),
        description: z
            .string()
            .min(1, { message: "Opis wydarzenia jest wymagany." })
            .max(500, { message: "Opis może mieć maksymalnie 500 znaków." }),
    })
    .refine((data) => {
        console.log(data)
        const startDate = Number(new Date(data?.start_date).getTime());
        const endDate = data.end_date ? new Date(data.end_date).getTime() : null;
        return !endDate || endDate > startDate;
    }, {
        path: ["end_date"],
        message: "Data zakończenia musi być późniejsza niż data rozpoczęcia.",
    });
