import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ parent, request }) => {
  const { user } = await parent();

  if (!user) {
    redirect(303, "/sign-in");
  }

  const cookie = request.headers.get("cookie") ?? "";

  return { user, cookie };
};
