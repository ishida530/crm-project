import { z } from 'zod';

export const formSchema = z.object({
    brand: z.string().min(1, "Marka jest wymagana"),
    model: z.string().min(1, "Model jest wymagany"),
    inspection_date: z.string().nullable().optional(),
    insurance_date: z.string().nullable().optional(),
    technical_inspection: z.enum(['0', '1']).optional(),

    driver: z.string().optional(),
    owner: z.string().optional(),
    vin: z.string().min(1, "VIN jest wymagany"),
    engine: z.string().min(1, "Silnik jest wymagany"),
    year: z.number().min(1900, "Rok musi być co najmniej 1900").max(new Date().getFullYear(), "Rok nie może być w przyszłości")
});
