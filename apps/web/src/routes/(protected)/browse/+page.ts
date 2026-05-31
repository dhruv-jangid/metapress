import { createORPC } from "$lib/orpc";

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { queryClient, cookie } = await parent();

  const orpc = createORPC(cookie);

  await queryClient.prefetchQuery(orpc.blog.getFeed.queryOptions());
};
