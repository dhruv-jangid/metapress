import { createServerFn } from "@tanstack/react-start";

import { MailService } from "../mail/mail.service";
import { contactMessage } from "../mail/mail.constant";
import { MailError, handleMailError } from "../mail/mail.error";
import { GeneralService } from "./general.service";
import { GeneralError, handleGeneralError } from "./general.error";
import { contactUserSchema, newsletterSchema } from "@/shared/common/common.schema";

export const getBlogsFeed = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await GeneralService.getBlogsFeed();
  } catch (error) {
    if (error instanceof GeneralError) {
      handleGeneralError(error);
    }
    throw new Error("Something went wrong");
  }
});

export const contactUser = createServerFn({ method: "POST" })
  .inputValidator(contactUserSchema)
  .handler(async ({ data }) => {
    try {
      await MailService.send({
        subject: "MetaPress Team",
        to: data.email,
        text: contactMessage,
      });
    } catch (error) {
      if (error instanceof MailError) {
        handleMailError(error);
      }
      throw new Error("Something went wrong");
    }
  });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator(newsletterSchema)
  .handler(async ({ data }) => {
    try {
      await MailService.send({
        subject: "Newsletter Subscription",
        to: data.email,
        text: `Thanks for subscribing to our newsletter!`,
      });
    } catch (error) {
      if (error instanceof MailError) {
        handleMailError(error);
      }
      throw new Error("Something went wrong");
    }
  });
