import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/browse", replace: true });
    }
  },
  component: Outlet,
});
