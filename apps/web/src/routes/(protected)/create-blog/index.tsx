import { createFileRoute } from "@tanstack/react-router";

import { CreateBlogUI } from "./-components/ui";

export const Route = createFileRoute("/(protected)/create-blog/")({
  head: () => ({
    meta: [{ title: "Create Blog" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  return <CreateBlogUI username={user.username} />;
}
