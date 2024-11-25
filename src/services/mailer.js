const nodemailer = require("nodemailer");
module.exports = {
  transporter: nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.mailerUser,
      pass: process.env.mailerPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  }),
};
