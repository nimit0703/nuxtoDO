import SignupSchemas from "~/schemas/Signup.schemas";

import { Validator } from '#nuxt-server-utils';
import { User } from "~/server/models/User.model";

export default defineEventHandler(async (event) => {

  const data = await readBody(event);
  Validator.validateSchema(SignupSchemas, data);
  const user = await User.create(data);

  return {...user.toObject(),password:undefined}
});

