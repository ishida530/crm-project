import { z } from "zod";

export const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Nazwa musi mieć co najmniej 3 znaki" })
        .max(50, { message: "Nazwa nie może mieć więcej niż 50 znaków" })
        .nonempty({ message: "Nazwa jest wymagana" }),

    description: z
        .string()
        .max(1000, { message: "Opis nie może przekroczyć 1000 znaków" })
        .optional(),
});
