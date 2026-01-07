import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/admin/"!</div>;
}
