import { Content } from 'next/font/google';
import {boolean, z} from 'zod';

export const messageSchema = z.object({
    Content:z
    .string()
    .min(10,{message:'Content must be at least 10 characters long'})
    .max(300,{message:'Content must be no longer then 300 characters long'})
})