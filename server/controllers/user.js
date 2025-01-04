
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { ErrorHandler } from "../constant/config.js";
import { sendToken } from "../utils/features.js";
import joi from "joi"
const userValidationSchema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    mobileNumber: joi.string().pattern(/^[0-9]{10}$/).required(),
    password: joi.string().min(8).required(),
});

const newUser = async (req, res, next) => {
    try {
        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400));
        }

        const { name, email, mobileNumber, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("Email already exists", 400));
        }
        const user = await User.create({ name, email, mobileNumber, password });

        sendToken(res, user, 201, "User Created");
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler("Failed to create user", 500));
    }
};

const login=async(req,res,next)=>{
    const { email, password } = req.body;
    const user = await User.findOne({email}).select("+password");
    // if (!user) {
    //     return next(new ErrorHandler("Invalid username or password", 404));
    // }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //     return next(new ErrorHandler("Invalid username or password", 404));
    // }

    sendToken(res, user, 200, `Welcome back ${user}`);

}


const getUserDetails = ()=>{

}

export { newUser, login };
