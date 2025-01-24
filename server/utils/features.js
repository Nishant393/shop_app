import mongoose from "mongoose";
import jwt from "jsonwebtoken"


const connectDB = (url) => {
    mongoose.connect(url, { dbName: "shopApp" })
        .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
        .catch((err) => {
            console.error("Error connecting to DB:", err);
            process.exit(1);
        });
};

const cookieOption = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    // sameSite: "lax",
    samesite: "none",
    // sameSite:"true",
    httpOnly: true,
    secure: true,

}

    const sendToken = (res, user, code, message) => {
        const token = jwt.sign({ _id: user._id },
            process.env.jwt_Secret,
        );
        // console.log(token)
        // console.log(process.env.jwt_Secret)
        return res.status(code)
            .cookie("shop-user-tocken", token, cookieOption)
            .json({
                success: true,
                message,
                token,
                // user,
            });
    
    }


export{connectDB , sendToken,cookieOption}