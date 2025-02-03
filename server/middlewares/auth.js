import jwt from "jsonwebtoken";
import { ErrorHandler } from "../constant/config.js";
import { User } from "../models/user.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies["shop-user-token"]; // Fixed cookie key
        if (!token) {
            return next(new ErrorHandler("Please login to access these routes", 401));
        }

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

const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return next(new ErrorHandler("Forbidden: Admin access required", 403));
    }
    next();
};

export { isAuthenticated, isAdmin };
