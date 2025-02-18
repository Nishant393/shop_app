
import express from "express";
import { sendMailToAllAdmin, sendMailToAllUsers } from "../controllers/email.js";
import { emailAttachmentMiddleware } from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/admin.js";

const app = express.Router()

app.use(isAdmin)
app.post("/send-email",sendMailToAllUsers);
app.post("/send-email",emailAttachmentMiddleware,sendMailToAllUsers);
app.post("/send-emails",sendMailToAllAdmin);

  
export default app;