import { createFileRoute, notFound } from "@tanstack/react-router";

import { Like } from "@/components/like";
import { Share } from "@/components/share";
import { Author } from "@/components/author";
import { Badge } from "@/components/ui/badge";
import { Comment } from "@/components/comment";
import { EditDelete } from "@/components/edit-delete";
import { getBlog } from "@/server/blog/blog.controller";
import { idSchema } from "@/server/general/general.schema";
import { ContentViewer } from "@/components/content-viewer";
import { getComments } from "@/server/comment/comment.controller";

export const Route = createFileRoute("/(protected)/$username/$blogid")({
  beforeLoad: ({ params, context }) => {
    const { success } = idSchema.safeParse(params.username);
    if (!success) {
      throw notFound();
    }

    return context.user;
  },
  loader: async ({ params: { blogid } }) => {
    const blog = await getBlog({ data: blogid });
    const comments = await getComments({ data: blogid });

    return {
      blog,
      comments,
    };
  },
  head: ({ loaderData, params }) => ({
    meta: [{ title: `${loaderData?.blog.title ?? params.blogid + "- Not Found"}` }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const { blog, comments } = Route.useLoaderData();
  const isAuthor = user.role === "admin" || user.username === blog.author.username;

  return (
    <div className="space-y-8 lg:space-y-12 my-14 lg:my-24 w-11/12 md:w-md lg:w-xl xl:w-3xl mx-auto">
      {isAuthor && <EditDelete blogId={blog.id} isMobile />}

      <div className="flex justify-between">
        <h1 className="text-6xl text-balance lg:w-4/5 leading-16 tracking-tighter">{blog.title}</h1>

        {isAuthor && <EditDelete blogId={blog.id} />}
      </div>

      <div className="space-x-4">
        <time>
          {new Intl.DateTimeFormat("en-GB", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(blog.createdAt))}
        </time>
        <Badge>{blog.category}</Badge>
      </div>

      <ContentViewer content={blog.content} />

      <div className="flex justify-end items-center gap-4 mt-24">
        <hr className="w-4" />
        <Author image={blog.author.image} name={blog.author.name} username={blog.author.username} />
      </div>

      <Share username={blog.author.username} blogId={blog.id} />

      <div className="flex items-start justify-between">
        <Like blogId={blog.id} likes={blog.likes} isLiked={blog.isLiked} />
        <Comment
          isAuthor={isAuthor}
          blogId={blog.id}
          comments={comments}
          username={user.username}
        />
      </div>
    </div>
  );
}
