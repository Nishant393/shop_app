import { User } from "../models/user.js";
import { sendMail } from "../utils/email.js";

const sendMailToAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("email name");
        
        if (!users.length) {
            return res.status(404).json({ success: false, message: "No users found" });
        }
        const emails = users.map(user => user.email);
        console.log(emails)
        const subject = "This is a test message";
        const body = users.map(user => `
            <p>Dear ${user.name},</p>
            <p>Hello, this is a test mail. If you are receiving it, just ignore and delete it.</p>
            <p>Thank you</p>
        `);

        await Promise.all(emails.map((email, index) => sendMail(email, subject, body[index])));
        
        res.status(200).json({ success: true, message: "Emails sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Unable to send emails" });
    }
};

export { sendMailToAllUsers };
