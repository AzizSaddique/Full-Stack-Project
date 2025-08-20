import {z} from 'zod';

export const signInSchema = z.object({
    Identifires: z.string(),
    password: z.string()
})