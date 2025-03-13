
import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z.string(),
    token: z.string()
  })
  .required();

export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;