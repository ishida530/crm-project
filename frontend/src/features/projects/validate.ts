import { z } from 'zod';
import { TaskStatus } from './types';

import { z } from "zod";

export const formSchemaTask = z.object({
    name: z
        .string()
        .min(1, { message: "Nazwa zadania jest wymagana" })
        .max(100, { message: "Nazwa zadania nie może przekraczać 100 znaków" }),

    description: z
        .string()
        .min(1, { message: "Opis jest wymagany" })
        .max(500, { message: "Opis nie może przekraczać 500 znaków" }),

    status: z
        .string()
        .optional(),  // Ensure it's an optional string

    start_date: z
        .string()
        .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: "Start date must be a valid date",
        })
        .optional(),  // Make start_date optional, but validate if provided
});


export const formSchemaProject = z.object({
    id: z.number().optional(),
    name: z
        .string()
        .min(1, { message: "Nazwa projektu jest wymagana" })
        .max(100, { message: "Nazwa projektu nie może przekraczać 100 znaków" }),

    deadline: z
        .string()
        .min(1, { message: "Data jest wymagana" })
        .refine((date) => {
            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime());
        }, {
            message: "Nieprawidłowa data",
        }),

    investor_representative: z
        .string()
        .min(1, { message: "Przedstawiciel inwestora jest wymagany" })
        .max(100, { message: "Przedstawiciel inwestora nie może przekraczać 100 znaków" }),

    project_manager: z
        .string()
        .min(1, { message: "Kierownik projektu jest wymagany" })
        .max(100, { message: "Kierownik projektu nie może przekraczać 100 znaków" }),
    project_template_id: z
        .string().optional(),
    group_id: z
        .number()
        .optional(),
});
