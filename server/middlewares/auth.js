import jwt from "jsonwebtoken";
import { ErrorHandler } from "../constant/config.js"



const isAuthenticated =async(req, res, next)=>{
    try {
        const tocken = req.cookies["shop-user-tocken"]
        if(!tocken){
            return next(new ErrorHandler("please login to access these routes", 401));
        }
        // change  with env variables 
        const data=jwt.verify(tocken, "auth-secret");
        req.user =data._id;
    } catch (error) {
        console.log(error);
        next(error);
    }

}

export {isAuthenticated}