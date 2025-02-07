



import express from "express";
import { sendMailToAllUsers } from "../controllers/email.js";

const app = express.Router()


app.post("/send-email",sendMailToAllUsers);


export default app;