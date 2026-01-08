import { createFileRoute } from "@tanstack/react-router";
import { Grid } from "@/components/grid";
import { getBlogsFeed } from "@/server/general/general.controller";

export const Route = createFileRoute("/(protected)/feed")({
  loader: async () => {
    return await getBlogsFeed();
  },
  head: () => ({
    meta: [{ title: "Feed" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const blogs = Route.useLoaderData();

  return (
    <>
      {blogs.length > 0 ? (
        <div className="min-h-dvh">
          <div className="mt-16 ml-auto mr-6 lg:mr-12 pb-2 w-2xs lg:w-md text-end text-3xl lg:text-4xl tracking-tight border-b border-accent-foreground/50 border-dashed">
            ... Feed
          </div>
          <Grid blogs={blogs} />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-dvh text-4xl rounded-lg w-3/4 mx-auto">
          There are currently no blogs to display!
        </div>
      )}
    </>
  );
}
