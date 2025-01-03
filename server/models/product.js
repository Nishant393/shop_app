import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
   productName: {
      type: String,
      required: true,
   },
   Quantity: {
    type: Number,
    required:true, 
    default:0,
   },

   productUrl: {
    public_id: {
       type: String,
       required: true,
    },
    url: {
       type: String,
       required: true,
    },
 },
 statusOfAvailability: {
    type: Boolean,
    default: true,
 },
    
},
{
   timestamps: true
});





export const User = mongoose.models.User || model("Product", schema);
