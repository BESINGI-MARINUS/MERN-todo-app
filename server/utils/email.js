const nodemailer = require("nodemailer");

async function sendEmail(options) {
  function createTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWD,
      },
    });
  }

  const transport = createTransport();

  await transport.sendMail({
    from: process.env.SENDGRID_SENDER_EMAIL,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: `<strong>${options.text}</strong>`,
  });
}

module.exports = sendEmail;
