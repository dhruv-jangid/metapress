import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/admin")({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw notFound();
    }
  },
  component: Outlet,
});
