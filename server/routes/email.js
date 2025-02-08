
import express from "express";
import { sendMailToAllUsers } from "../controllers/email.js";
import { emailAttachmentMiddleware } from "../middlewares/multer.js";

const app = express.Router()


app.post("/send-email",emailAttachmentMiddleware,sendMailToAllUsers);

  
export default app;