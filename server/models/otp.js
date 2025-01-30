
import mongoose, {Schema} from "mongoose"

const otpSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
})

export const Otp = mongoose.models.otp || model("otp", otpSchema);