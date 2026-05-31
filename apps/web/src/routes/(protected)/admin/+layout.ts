import { redirect } from "@sveltejs/kit";

import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ parent }) => {
  const { user } = await parent();

  if (user.role!.toLowerCase() !== "admin") {
    redirect(302, "/browse");
  }
};
