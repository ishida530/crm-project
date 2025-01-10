import { z } from "zod";
import { Status } from "./types";

export const attendanceSchema = z.object({
    user_id: z.number().nonnegative(),
    user_name: z.string().min(1, 'Name is required'),
    attendances: z
      .array(
        z.object({
          date: z.string().min(1, 'Date is required'), // Ensure date is required
          status: z.nativeEnum(Status).refine((status) => 
            Object.values(Status).includes(status), { // Ensure status is valid
              message: 'Status must be selected',
            }
          ),
        })
      )
      .min(1, 'At least one attendance record is required'),
  });
  