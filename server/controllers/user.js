import joi from "joi";
import { User } from "../models/user.js";
import { ErrorHandler } from "../constant/config.js";

// const userValidationSchema = joi.object({
//     name: joi.string().min(3).max(50).required(),
//     email: joi.string().min(3).max(30).required(),
//     mobileNumber:joi.number().min(10).required(),
//     password: joi.string().min(8).required(),
// });

const newUser = async (req, res, next) => {
    try {
        const { name, email, mobileNumber, password } = req.body;
        // const { error } = userValidationSchema.validate(req.body);
        // if (error) {
        //     console.log("schema validation error ", error);
        // }
        const existingUser =await User.findOne({email});
        if (existingUser) {
            return next(new ErrorHandler("Username already exists", 400));
        }
        const user = await User.create({ name, email,mobileNumber, password});
        sendToken(res, user, 201, "User Created");
        console.log(user);
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Failed to create user: " + error.message, 500));
    }

}

export {newUser}