import jwt from "jsonwebtoken";
import { ErrorHandler } from "../constant/config.js"

const isAuthenticated =async(req, res, next)=>{
    try {
        const token = req.cookies["shop-user-tocken"]
        console.log(token)
        if(!token){
            return next(new ErrorHandler("please login to access these routes", 401));
        }
        const data=jwt.verify(token, process.env.jwt_Secret);
        req.user =data._id;
        next()
        
    } catch (error) {
        console.log(error);
        next(error);
    }

}



const isAdmin = (req, res, next) => {
    if (req.user.isAdmin !== "true") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

// export{isAdmin}

export {isAuthenticated,isAdmin}