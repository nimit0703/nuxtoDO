import {Validator} from '#nuxt-server-utils'
import SignupSchemas from '~/schemas/Signup.schemas';
import { User } from '~/server/models/User.model';
export default defineEventHandler(async (event)=>{

    const body = await readBody(event);
    Validator.validateSchema(SignupSchemas,body)
    const user =  await User.create(body)
    return {...user.toObject(),password:undefined};
})