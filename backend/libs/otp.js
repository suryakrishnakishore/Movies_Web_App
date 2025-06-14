import nodemailer from "nodemailer";
import env from "dotenv";

env.config();

export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});