import express from "express";
import { connectDB } from "./utils/features.js";
import { createServer } from 'http';
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js"
import cartRoute from "./routes/cart.js"
import { errorMiddleware } from "./middlewares/error.js";
import { corsOption } from "./utils/constant.js";
import dotenv  from "dotenv";

try {
    dotenv.config({ path: "./.env" });
} catch (error) {
    console.error("Failed to load environment variables:", error);
    process.exit(1); // Exit process if .env fails
}


const app = express();
const mongoUrl = process.env.mongourl
const port = process.env.port || 3000
const server = createServer(app);



app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

try {
    connectDB(mongoUrl)
    
} catch (error) {
    console.log(error);
    
}


app.get("/", (req, res) => {
    res.json("hello to shop backend");
});

app.use("/user",userRoute);
// app.use("/cart",cartRoute);


app.use(errorMiddleware)

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});