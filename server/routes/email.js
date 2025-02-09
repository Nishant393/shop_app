
import express from "express";
import { sendMailToAllAdmin, sendMailToAllUsers } from "../controllers/email.js";
import { emailAttachmentMiddleware } from "../middlewares/multer.js";

const app = express.Router()


<<<<<<< HEAD
app.post("/send-email",sendMailToAllUsers);
=======
app.post("/send-email",emailAttachmentMiddleware,sendMailToAllUsers);
app.post("/send-emails",sendMailToAllAdmin);
>>>>>>> b2f95fe00869e10772a0ac53c337e36484f04d8c

  
export default app;