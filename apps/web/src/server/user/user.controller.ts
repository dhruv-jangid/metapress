import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/middleware/auth";
import { usernameSchema } from "@/shared/user/user.schema";
import { handleUserError, UserError } from "./user.error";
import { UserService } from "./user.service";

export const getUserWithBlogs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(usernameSchema)
  .handler(async ({ data, context }) => {
    try {
      const userService = new UserService(context);
      const user = await userService.findByUsername(data);
      const blogs = await userService.findBlogs(user.id);

      return { user, blogs };
    } catch (error) {
      if (error instanceof UserError) {
        handleUserError(error);
      }
      throw new Error("Something went wrong");
    }
  });

export const getUserLikedBlogs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(usernameSchema)
  .handler(async ({ data, context }) => {
    try {
      const userService = new UserService(context);
      const { blogs } = await userService.findLikedBlogsById(data);

      return blogs;
    } catch (error) {
      if (error instanceof UserError) {
        handleUserError(error);
      }
      throw new Error("Something went wrong");
    }
  });
