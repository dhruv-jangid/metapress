import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserGrid } from "@/components/user-grid";
import { Separator } from "@/components/ui/separator";
import { usernameSchema } from "@/shared/user/user.schema";
import { getUserWithBlogs } from "@/server/user/user.controller";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/(protected)/$username/")({
  beforeLoad: ({ params }) => {
    const { success } = usernameSchema.safeParse(params.username);
    if (!success) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const data = await getUserWithBlogs({ data: params.username });
    return { user: data.user, blogs: data.blogs.blogs };
  },
  head: ({ loaderData, params }) => ({
    meta: [{ title: `${loaderData?.user.name ?? params.username + "- Not Found"}` }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { user, blogs } = Route.useLoaderData();

  return (
    <div className="flex flex-col items-center min-h-dvh">
      <div className="flex justify-center gap-8 xl:gap-12 w-full pt-12 pb-14 lg:pt-14 lg:pb-16 xl:py-18">
        <div className="mt-2 lg:mt-1 xl:mt-0">
          <Avatar className="aspect-square size-24 lg:size-28 xl:size-32">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />
            <AvatarFallback className="text-3xl">{user.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-2">
          <div className="text-3xl lg:text-4xl tracking-tight">{user.username}</div>
          <div className="inline-flex items-center gap-2">
            {blogs.length}
            <span className="text-muted-foreground">Blogs</span>
          </div>
          <div className="flex gap-2 items-center text-lg opacity-85 tracking-tight font-medium">
            {user.name}
            {user.role === "admin" && (
              <Badge variant="destructive">{user.role.toUpperCase()}</Badge>
            )}
          </div>
        </div>
      </div>

      {blogs.length > 0 ? (
        <div className="min-h-[60dvh] md:min-h-[68dvh] w-full lg:px-8 xl:px-16">
          <UserGrid blogs={blogs} />
        </div>
      ) : (
        <>
          <Separator />

          <div className="flex justify-center items-center min-h-[75dvh] text-4xl w-full text-muted-foreground text-center">
            {user.isSelf ? (
              <Link to="/create-blog">
                <Button variant="secondary">Create your first blog</Button>
              </Link>
            ) : (
              <div className="tracking-tighter">This user have not published any blogs yet!</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
