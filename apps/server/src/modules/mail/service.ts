import { env } from "@metapress/env/server";
import { ORPCError } from "@orpc/server";
import { createTransport } from "nodemailer";

const user = env.EMAIL_USER;
const pass = env.EMAIL_PASS;

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
        from: env.EMAIL_USER,
        to: data.to,
        subject: data.subject,
        text: fullText,
      });
    } catch (error) {
      throw new ORPCError("SEND_FAILED", error as Error);
    }
  }
}
