import { Schema, model, Document } from "mongoose";
import { generateHash } from "../utils/hash";
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
  name: string,
  email: string,
  password: string,
  stripeCustomerId ?: string,

  comparePassword :(password:string)=>Promise<boolean>,
}
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      select:false,
    },
    stripeCustomerId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next) {
    
    if(!this.isModified('password')) return next();

    //@ts-ignore
    this.password = await generateHash(this.password);
})

userSchema.methods.comparePassword =async function(password:string){
    return await bcrypt.compare(password, this.password);
}

export const User = model<UserDocument>("User", userSchema);
