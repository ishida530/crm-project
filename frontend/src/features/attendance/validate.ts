import { z } from "zod";
import { Status } from "./types";

export const attendanceSchema = z.object({
    user_name: z.string().min(1, 'Imię jest wymagane'),
    attendances: z
      .array(
        z.object({
          date: z.string().min(1, 'Data jest wymagana'), // Upewnij się, że data jest wymagana
          status: z.nativeEnum(Status).refine((status) => 
            Object.values(Status).includes(status), { // Upewnij się, że status jest prawidłowy
              message: 'Status musi zostać wybrany',
            }
          ),
        })
      )
      .min(1, 'Wymagany jest co najmniej jeden zapis obecności'),
});
