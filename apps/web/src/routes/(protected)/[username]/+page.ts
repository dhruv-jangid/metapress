import { createORPC } from "$lib/orpc";
import { UsernameSchema } from "@metapress/contracts/common";
import { error } from "@sveltejs/kit";

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
  const { username } = params;

  const { success } = UsernameSchema.safeParse(username);
  if (!success) {
    error(404, "User not found");
  }

  const { queryClient, cookie } = await parent();

  const orpc = createORPC(cookie);

  await queryClient.prefetchQuery(orpc.user.getWithBlogs.queryOptions({ input: { username } }));

  return { username };
};
