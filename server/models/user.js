import mongoose, { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const schema = new Schema({
   name: {
      type: String,
      required: true,
   },
   mobileNumber: {
    type: String,
    required:true,
   },
   email: {
      type: String,
      unique: true,
      required: true,
   },
   password: {
      type: String,
      select: false, 
      required: true,
   },
  
},
{
   timestamps: true
});

schema.pre("save", async function (next) {
   if (!this.isModified("password")) return next(); 
   this.password = await hash(this.password, 10);
   return next(); 
});




export const User = mongoose.models.User || model("User", schema);
