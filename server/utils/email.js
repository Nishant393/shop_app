import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendMail = async (receiverEmail, subject, body) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: receiverEmail,
    subject,
    html: body,
  });
};
