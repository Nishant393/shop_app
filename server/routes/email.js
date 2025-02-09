
import express from "express";
import { sendMailToAllAdmin, sendMailToAllUsers } from "../controllers/email.js";
import { emailAttachmentMiddleware } from "../middlewares/multer.js";

const app = express.Router()


app.post("/send-email",emailAttachmentMiddleware,sendMailToAllUsers);
app.post("/send-emails",sendMailToAllAdmin);

  
export default app;