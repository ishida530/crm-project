import { z } from "zod";

export const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name cannot be longer than 50 characters" })
        .nonempty({ message: "Name is required" }),

    description: z
        .string()
        .max(1000, { message: "Description cannot exceed 1000 characters" })
        .optional(),
});
