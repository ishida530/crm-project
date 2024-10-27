import { z } from "zod"
 
export const formSchema = z.object({
    email: z.string().min(5, "Email must be at least 5 characters long").max(50, "Email must be at most 50 characters long").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(50, "Password must be at most 50 characters long"),
});