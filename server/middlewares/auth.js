import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies["shop-user-token"]; 
        if (!token) {
            return next(new ErrorHandler("Please login to access these routes", 401));
        }
        console.log("isAuthenticated", token)
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET); // Fixed env variable name
        } catch (err) {
            return next(new ErrorHandler("Invalid or expired token", 401));
        }

        const user = await User.findById(decoded._id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return next(new ErrorHandler("Authentication failed", 401));
    }
};



export { isAuthenticated };
