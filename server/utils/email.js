import nodemailer from "nodemailer"




const sendMail = async (receiverEmail, subject, body) => {
  try {
    console.log("env mail",process.env.EMAIL_USER)
    
    const res = await nodemailer.createTransport(
      {
      service: "gmail",
      auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
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
