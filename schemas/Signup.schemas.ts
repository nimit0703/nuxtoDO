import {z} from 'zod';
import SigninSchemas from './Signin.schemas';

export default SigninSchemas.extend({
    name: z.string().min(3).max(100),
    passwordConfirm : z.string().min(8),
}).refine(data=> data.password == data.passwordConfirm,{
    message: "password are not same",
    path: ['passwordConfirm']
})