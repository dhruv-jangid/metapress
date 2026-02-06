import { createFileRoute, notFound } from "@tanstack/react-router";
import { Author } from "@/components/author";
import { Comment } from "@/components/comment";
import { ContentViewer } from "@/components/content-viewer";
import { EditDelete } from "@/components/edit-delete";
import { Like } from "@/components/like";
import { Share } from "@/components/share";
import { Badge } from "@/components/ui/badge";
import { idSchema } from "@/server/general/general.schema";
import { blogQueryOptions } from "@/server/blog/blog.query";
import { commentsQueryOptions } from "@/server/comment/comment.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usernameSchema } from "@/shared/user/user.schema";

export const Route = createFileRoute("/(protected)/$username/$blogid")({
  beforeLoad: ({ params }) => {
    const { success: blogIdParseSuccess } = idSchema.safeParse(params.blogid);
    const { success: usernameParseSuccess } = usernameSchema.safeParse(params.username);
    if (!blogIdParseSuccess || !usernameParseSuccess) {
      throw notFound();
    }
  },
  loader: async ({ params, context }) => {
    const blog = await context.queryClient.ensureQueryData(blogQueryOptions({ id: params.blogid }));
    await context.queryClient.ensureQueryData(commentsQueryOptions({ id: params.blogid }));

    return { blog };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.blog.title ?? "Not Found"}` }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const { blogid } = Route.useParams();
  const { data: blog } = useSuspenseQuery(blogQueryOptions({ id: blogid }));
  const { data: comments } = useSuspenseQuery(commentsQueryOptions({ id: blogid }));
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
