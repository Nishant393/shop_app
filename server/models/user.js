import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
   name: {
      type: String,
      required: true,
   },
   mobileNumber: {
    type: String,

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






export const User = mongoose.models.User || model("User", schema);
