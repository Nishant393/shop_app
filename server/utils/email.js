import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport(
  {
  service: "gmail",
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,
  },
}
);

const sendMail = async (receiverEmail, subject, body) => {
  try {
    console.log("env mail",process.env.EMAIL_USER)
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
