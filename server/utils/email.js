const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = `Silva Technologies Team <${process.env.SENDGRID_SENDER_EMAIL}>`;
  }

  transport() {
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

    // Catch emails on mailtrap development environment
    return nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../templates/email/${template}.pug`,
      {
        url: this.url,
        firstName: this.firstName,
        subject,
      },
    );
    const text = htmlToText.convert(html);

    await this.transport().sendMail({
      from: this.from,
      to: this.to,
      subject,
      html,
      text,
    });
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to Task Planner.");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "Your password reset token");
  }
};

// async function sendEmail(options) {
//   function createTransport() {
//     if (process.env.NODE_ENV === "production") {
//       return nodemailer.createTransport({
//         host: "smtp.sendgrid.net",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: "apikey",
//           pass: process.env.SENDGRID_API_KEY,
//         },
//       });
//     }

//     return nodemailer.createTransport({
//       host: process.env.MAILTRAP_HOST,
//       port: process.env.MAILTRAP_PORT,
//       auth: {
//         user: process.env.MAILTRAP_USER,
//         pass: process.env.MAILTRAP_PASSWD,
//       },
//     });
//   }

//   const transport = createTransport();

//   await transport.sendMail({
//     from: process.env.SENDGRID_SENDER_EMAIL,
//     to: options.to,
//     subject: options.subject,
//     text: options.text,
//     html: `<strong>${options.text}</strong>`,
//   });
// }

// module.exports = sendEmail;
