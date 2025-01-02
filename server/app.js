import express from "express";
import { connectDB } from "./utils/utilsFunctions.js";
import { createServer } from 'http';


const app = express();


const mongouri = 'mongodb://localhost:27017/'
const port = 3000
const server = createServer(app);

try {
    connectDB(mongouri)
    
} catch (error) {
    console.log(error);
    
}

app.get("/", (req, res) => {
    res.json("hello to shop backend");
});



server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});