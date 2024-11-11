import { z } from 'zod';
import { TaskStatus } from './types';

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
        .union([
            z.literal(TaskStatus.TO_DO),
            z.literal(TaskStatus.IN_PROGRESS),
            z.literal(TaskStatus.COMPLETED)
        ])
        .refine(value => Object.values(TaskStatus).includes(value), {
            message: "Status jest wymagany",
        }),

    author: z
        .string()
        .min(1, { message: "Autor jest wymagany" })
        .max(100, { message: "Autor nie może przekraczać 100 znaków" }),

    date: z
        .string()
        .min(1, { message: "Data jest wymagana" })
        .refine((date) => {
            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime());
        }, {
            message: "Nieprawidłowa data",
        }),
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

    investorRepresentative: z
        .string()
        .min(1, { message: "Przedstawiciel inwestora jest wymagany" })
        .max(100, { message: "Przedstawiciel inwestora nie może przekraczać 100 znaków" }),

    projectManager: z
        .string()
        .min(1, { message: "Kierownik projektu jest wymagany" })
        .max(100, { message: "Kierownik projektu nie może przekraczać 100 znaków" }),
});
