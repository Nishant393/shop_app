import { User } from "../models/user.js";
import { sendMail } from "../utils/email.js";

const sendMailToAllUsers = async (req, res) => {
    try {
        const { subject, message } = req.body;
        // const attachments = req.files || [];
        // console.log(attachments)
        // if (!subject || !message) {
        //     return res.status(400).json({ success: false, message: "Subject and message are required" });
        // }

        const users = await User.find().select("email name");
        
        if (!users.length) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        const emailPromises = users.map(user => {
            const body = `
                <p>Dear ${user.name},</p>
                <p>${message}</p>
                <p>Thank you</p>
            `;
            return sendMail(user.email, subject,  body, 
            );
        });

        await Promise.all(emailPromises);
        
        res.status(200).json({ success: true, message: "Emails sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Unable to send emails" });
    }
};

export { sendMailToAllUsers };
