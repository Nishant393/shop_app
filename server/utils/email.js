import nodemailer from "nodemailer"


const emailuser =process.env.EMAIL_USER
const emailAppPassword = process.env.EMAIL_PASS

const transporter = nodemailer.createTransport(
  {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // `true` for port 465, `false` for 587
  auth: {
    user: emailuser,
    pass: emailAppPassword,
  },
}
);

const sendMail = async (receiverEmail, subject, body) => {
  try {
    console.log("auth value", transporter.auth)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      subject: subject,
      html: body,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendMail };
