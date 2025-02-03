import jwt from "jsonwebtoken";
import { ErrorHandler } from "../constant/config.js";
import { User } from "../models/user.js";


const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies["shop-user-tocken"];
        console.log(token)
        if (!token) {
            return next(new ErrorHandler("Please login to access these routes", 401));
        }
        
        const decoded = jwt.verify(token, process.env.jwt_Secret);
        const user = await User.findById(decoded._id);
        
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        
        req.user = user;
        next();
        
    } catch (error) {
        console.error("Authentication Error:", error);
        next(new ErrorHandler("Authentication failed", 401));
    }
};

const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        console.log(req.user)
        return res.status(403).json({ 
            success: false, 
            message: "Forbidden: Admin access required" 
        });
    }
    next();
};

export { isAuthenticated, isAdmin };