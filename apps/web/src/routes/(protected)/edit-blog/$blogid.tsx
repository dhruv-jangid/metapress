import { createFileRoute, notFound } from "@tanstack/react-router";

import { EditBlogUI } from "./-components/ui";
import { getBlog } from "@/server/blog/blog.controller";

export const Route = createFileRoute("/(protected)/edit-blog/$blogid")({
  loader: async ({ params: { blogid }, context }) => {
    const blog = await getBlog({ data: blogid });
    if (blog.author.username !== context.user.username) {
      throw notFound();
    }

    return { blog };
  },
  head: ({ loaderData, params }) => ({
    meta: [
      {
        title: loaderData?.blog.title
          ? `Editing - ${loaderData.blog.title}`
          : `${params.blogid} - Not Found`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { blog } = Route.useLoaderData();

  return <EditBlogUI oldBlog={blog} />;
}
