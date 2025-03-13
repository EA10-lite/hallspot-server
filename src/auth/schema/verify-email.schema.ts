
import { z } from 'zod';

export const verifyEmailSchema = z
  .object({
    email: z.string().email(),
    code: z.string().min(6).max(6)
  })
  .required();

export type VerifyDTO = z.infer<typeof verifyEmailSchema>;