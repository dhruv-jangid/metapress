import { createFileRoute } from "@tanstack/react-router";
import { Logout } from "@/components/logout";

export const Route = createFileRoute("/(protected)/account/profile")({
  head: () => ({
    meta: [{ title: "Edit Profile (Beta)" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  return (
    <div className="pt-24 min-h-dvh">
      <div className="text-5xl font-medium tracking-tight pb-8 text-end border-b border-dashed w-full px-12 lg:px-64">
        Profile
      </div>

      <div className="space-y-12 mx-12 lg:mx-24 text-xl mt-36">
        <div className="tracking-tight">Username: {user.username}</div>
        <div className="tracking-tight">Name: {user.name}</div>
        <div className="space-y-2">
          <div className="tracking-tight">Logout from current device</div>
          <Logout />
        </div>
      </div>
    </div>
  );
}
