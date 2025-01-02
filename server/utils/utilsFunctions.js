import mongoose from "mongoose";

const connectDB = (uri) => {
    mongoose.connect(uri, { dbName: "shopApp" })
        .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
        .catch((err) => {
            console.error("Error connecting to DB:", err);
            process.exit(1);
        });
};

export {connectDB}