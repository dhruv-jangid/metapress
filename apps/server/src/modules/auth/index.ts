import { Elysia } from "elysia";

import { auth } from "@/lib/auth";

export const authController = new Elysia().all(
  "/auth/*",
  async (context) => {
    const { request, status } = context;
    if (["POST", "GET"].includes(request.method)) {
      return auth.handler(request);
    }
    return status(405);
  },
  { parse: "none" },
);
