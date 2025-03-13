
import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(1).max(50),
    email: z.string().email(),
    role: z.enum(['USER', 'AGENT']),
    password: z.string().min(6).max(1024)
  })
  .required();

export type SignUpDTO = z.infer<typeof signupSchema>;