import { z } from 'zod';

export const productSchema = z.object({
    producer: z.string().min(1, "Producer is required"),
    name: z.string().min(1, "Product Name is required"),
    quantity: z.number().min(1, "Quantity must be a positive number").int("Quantity must be an integer"),
    unitOfMeasure: z.string().min(1, "Unit of Measure is required"),
});