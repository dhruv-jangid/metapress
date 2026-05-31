import { createORPC } from "$lib/orpc";
import { error } from "@sveltejs/kit";

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
  const { cookie, user } = await parent();

  const { blogid } = params;

  const orpc = createORPC(cookie);

  const blog = await orpc.blog.get.call({ id: blogid });

  if (user.username !== blog.author.username && user.role !== "admin") {
    error(403, "You do not have permission to edit this blog post.");
  }

  return { blogId: blogid, blog };
};
