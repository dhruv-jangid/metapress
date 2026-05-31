import { protectedProcedure, publicProcedure } from "@/lib/orpc";

import { MailService } from "../mail/service";
import { UserService } from "./service";

export const contactUser = publicProcedure.user.contact.handler(async ({ input }) => {
  return await MailService.send({
    subject: "Newsletter Subscription",
    to: input.email,
    text: `Thanks for subscribing to our newsletter!`,
  });
});

export const subscribeToNewsletter = publicProcedure.user.subscribeToNewsletter.handler(
  async ({ input }) => {
    return await MailService.send({
      subject: "Newsletter Subscription",
      to: input.email,
      text: `Thanks for subscribing to our newsletter!`,
    });
  },
);

export const getUserWithBlogs = protectedProcedure.user.getWithBlogs.handler(
  async ({ context, input }) => {
    const dbUser = await UserService.findByUsername(input.username, context.user);
    const blogs = await UserService.findBlogs(dbUser.id);

    return { user: dbUser, blogs };
  },
);

export const getUserLikedBlogs = protectedProcedure.user.getLikedBlogs.handler(
  async ({ context }) => {
    return await UserService.findLikedBlogs(context.user.id);
  },
);
