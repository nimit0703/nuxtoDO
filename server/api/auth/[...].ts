import {NuxtAuthHandler} from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import { User } from "~/server/models/User.model";


export default NuxtAuthHandler({

  secret: useRuntimeConfig().auth.secret,
  providers:[
    //@ts-ignore
    CredentialsProvider.default({
      name:"credentials",
      origin:useRuntimeConfig().auth.origin,

      async authorize(credentials:{
        email:string,
        password:string
      }){
        // login logic
        const user = await User.findOne({email:credentials.email})

        if(!user){
          return null;
        }

        const isValid = await user.comparePassword(credentials.password);

        if(!isValid){
          return null;
        }

        return user.toObject();
      }
    })
  ]
})