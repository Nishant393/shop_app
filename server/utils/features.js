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
export const getBase64 = (file)=>
    `data:${file.mimetype};
base64,${file.buffer.toString("base64")}`

    const uploadFilesToCloudinary = async (file) => {
        if (!file) {
            throw new Error("No files provided for upload.");
        }
    
        try {
            const uploads = file.map((file) =>
                cloudinary.uploader.upload(getBase64(file), {
                    resource_type: "auto",
                    // Generate unique ID for each file
                    public_id: uuid(),
                })
            );
    
            const results = await Promise.all(uploads);
    
            console.log("Upload results:", results);
    
            return results.map((result) => ({
                public_id: result.public_id,
                url: result.secure_url,
            }));
        } catch (error) {
            console.error("Error uploading files to Cloudinary:", error);
            throw new Error("Error uploading files to Cloudinary");
        }
    };

export{connectDB , sendToken,cookieOption,uploadFilesToCloudinary}