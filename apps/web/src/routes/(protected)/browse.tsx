import { createFileRoute } from "@tanstack/react-router";

import { Grid } from "@/components/grid";
import { Separator } from "@/components/ui/separator";
import { VerticalList } from "@/components/vertical-list";
import { getBlogsFeed } from "@/server/general/general.controller";

export const Route = createFileRoute("/(protected)/browse")({
  loader: async () => {
    return await getBlogsFeed();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [blog1, blog2, ...blogs] = Route.useLoaderData();

  return (
    <>
      {blogs.length > 0 ? (
        <>
          <section className="flex flex-col xl:flex-row">
            <div className="lg:w-5/12 2xl:w-1/2 text-9xl 2xl:text-[11rem] leading-24 2xl:leading-32 pl-6 md:pl-10 lg:pl-12 xl:pl-16 mt-8 md:mt-12 xl:mt-16 tracking-tighter">
              <div>BL</div>
              <div className="ml-10">OG-</div>
              <div>NEW</div>
              <div className="flex items-center gap-8">
                <span>S</span>
                <span className="inline-flex flex-col text-2xl lg:text-3xl leading-5 lg:leading-6">
                  <span className="tracking-tight w-max">Latest News </span>
                  <span className="ml-10 tracking-tight w-max">and updates</span>
                </span>
              </div>
            </div>
            <VerticalList blogs={[blog1, blog2]} />
          </section>

          <Separator />

          <Grid blogs={blogs} />
        </>
      ) : (
        <div className="flex justify-center items-center w-xs sm:w-sm lg:w-lg xl:w-4xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-balance min-h-dvh tracking-tighter mx-auto">
          Oops! There are no blogs to display currently, please come back later.
        </div>
      )}
    </>
  );
}
