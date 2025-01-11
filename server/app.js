import express from "express";
import { connectDB } from "./utils/features.js";
import { createServer } from 'http';
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.js"
import cartRoute from "./routes/cart.js"
import { errorMiddleware } from "./middlewares/error.js";
import { corsOption } from "./utils/constant.js";


const app = express();


const mongourl = 'mongodb://localhost:27017/'
const port = 3000
const server = createServer(app);


app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

try {
    connectDB(mongourl)
    
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