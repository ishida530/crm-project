import { z } from "zod";

export const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Nazwa magazynu musi mieć co najmniej 3 znaki" })
        .max(100, { message: "Nazwa magazynu nie może przekroczyć 100 znaków" }),

    address: z
        .string()
        .min(10, { message: "Adres magazynu musi mieć co najmniej 10 znaków" })
        .max(200, { message: "Adres magazynu nie może przekroczyć 200 znaków" }),
});
