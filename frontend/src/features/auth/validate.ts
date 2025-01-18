import { z } from "zod"
 
export const formSchema = z.object({
    email: z.string().min(5, "Email must be at least 5 characters long").max(50, "Email must be at most 50 characters long").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(50, "Password must be at most 50 characters long"),
});


export const resetPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});


export const changePasswordSchema = z.object({
    current_password: z
        .string()
        .min(6, { message: 'Obecne hasło musi mieć co najmniej 6 znaków.' })
        .max(50, { message: 'Obecne hasło nie może mieć więcej niż 50 znaków.' }),
    new_password: z
        .string()
        .min(6, { message: 'Nowe hasło musi mieć co najmniej 6 znaków.' })
        .max(50, { message: 'Nowe hasło nie może mieć więcej niż 50 znaków.' }),
    confirm_password: z
        .string()
        .min(6, { message: 'Potwierdzenie hasła musi mieć co najmniej 6 znaków.' })
        .max(50, { message: 'Potwierdzenie hasła nie może mieć więcej niż 50 znaków.' }),
}).superRefine((data, ctx) => {
    if (data.new_password !== data.confirm_password) {
        ctx.addIssue({
            path: ['confirmPassword'],
            message: 'Potwierdzenie hasła musi pasować do nowego hasła.',
            code: z.ZodIssueCode.custom,
        });
    }
});

export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;
