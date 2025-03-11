
import { z } from 'zod';

export const bookingschema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1).max(50),
    phone: z.string(),

    date: z.preprocess((val) => new Date(), z.date()), 
    duration: z.number(),
    
    hallId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid Hall ID')
  })
  .required();

export type CreateCatDto = z.infer<typeof bookingschema>;