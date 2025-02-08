import nodemailer from "nodemailer";

const sendMail = async (receiverEmail, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT, 
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    transporter.verify((err, success) => {
      if (err) console.error(err);
      console.log('Your config is correct');
  });

    const response = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      subject: subject,
      html: body,
    });

    console.log("Email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendMail };
