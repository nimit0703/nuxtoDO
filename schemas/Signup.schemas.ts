import {z} from 'zod';

export default z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm : z.string().min(8),
}).refine(data=> data.password == data.passwordConfirm,{
    message: "password are not same",
    path: ['passwordConfirm']
})