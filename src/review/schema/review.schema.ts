
import { z } from 'zod';

export const reviewSchema = z
  .object({
    review: z.string(),
    rating: z.number().min(1).max(5),
  })
  .required();

export type CreateCatDto = z.infer<typeof reviewSchema>;