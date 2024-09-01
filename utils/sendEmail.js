const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // Outlook SMTP server
  port: 25, // Secure port
  secure: false, // true for 465, false for other ports
  auth: {
    user: "thakursaadblink@outook.com", // Your Outlook email address
    pass: "Faang Developer", // Your Outlook email password
  },
  tls: {
    ciphers: "SSLv3",
  },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: "your-email@gmail.com", // Sender address
      to: to, // List of recipients
      subject: subject, // Subject line
      text: text, // Plain text body
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
