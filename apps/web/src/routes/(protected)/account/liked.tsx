import { createFileRoute } from "@tanstack/react-router";
import { Grid } from "@/components/grid";
import { getUserLikedBlogs } from "@/server/user/user.controller";

export const Route = createFileRoute("/(protected)/account/liked")({
  loader: async ({ context }) => {
    return await getUserLikedBlogs({ data: context.user.id });
  },
  head: () => ({
    meta: [{ title: "Liked Blogs" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const blogs = Route.useLoaderData();

  return blogs.length > 0 ? (
    <div className="min-h-[92dvh]">
      <div className="text-center text-4xl my-16">Liked Blogs</div>
      <Grid blogs={blogs} />
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-dvh text-4xl rounded-lg w-3/4 mx-auto">
      You dont have any liked blogs currently!
    </div>
  );
}
