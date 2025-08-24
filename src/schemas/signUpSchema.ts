import {z} from 'zod';
export const userNameValidation = z
.string()
.min(2,'User name must be at least 2 char') 
.max(20,'User name must be no more then 20 char')
.regex(/^[a-zA-Z0-9_]+$/, 'User name must contain only alphanumeric characters and underscores')

export const signUpSchema = z.object({
    username: userNameValidation,
    email: z.string().email({message:'Email is not valid'}),
    password: z.string().min(6,{message:'Password must be at least 6 characters long'}),
})