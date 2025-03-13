
import { z } from 'zod';

export const hallSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    location: z.string(),
    capacity: z.number().min(1),
    price: z.number(),
    amenities: z.array(z.string()).min(1),
    tags: z.array(z.string()).min(1),
    images: z.array(z.string().url()).min(1),
  })
  .required();

export type CreateHallDto = z.infer<typeof hallSchema>;