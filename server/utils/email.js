import nodemailer from "nodemailer"


const emailuser =process.env.EMAIL_USER
const emailAppPassword = process.env.EMAIL_PASS


const sendMail = async (receiverEmail, subject, body) => {
  try {
    console.log("auth value", transporter.auth)
    await nodemailer.createTransport(
      {
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: emailuser,
        pass: emailAppPassword,
      },
    }
    ).sendMail({
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      subject: subject,
      html: body,
    });
    console.log("auth val",res)
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendMail };
