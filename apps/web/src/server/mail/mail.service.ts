import { createTransport } from "nodemailer";
import { MailError } from "./mail.error";

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

type SendMail = {
  to: string;
  subject: string;
  text: string;
};

const transporter = createTransport({
  service: "gmail",
  auth: { user, pass },
});

export class MailService {
  static async send(data: SendMail) {
    try {
      const fullText = `${data.text.trim()}\n\nBest Regards,\nThe MetaPress`;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.to,
        subject: data.subject,
        text: fullText,
      });
    } catch (error) {
      throw new MailError("SEND_FAILED", error);
    }
  }
}
