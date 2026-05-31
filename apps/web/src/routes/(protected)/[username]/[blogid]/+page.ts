import { createORPC } from "$lib/orpc";

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
  const { blogid } = params;

  const { queryClient, cookie } = await parent();

  const orpc = createORPC(cookie);

  await queryClient.prefetchQuery(orpc.blog.get.queryOptions({ input: { id: blogid } }));
  await queryClient.prefetchQuery(orpc.comment.getMany.queryOptions({ input: { id: blogid } }));

  return { blogId: blogid };
};
