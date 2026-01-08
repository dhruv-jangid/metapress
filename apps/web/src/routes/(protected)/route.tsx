import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Sidebar } from "@/components/sidebar/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/(protected)")({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/sign-in" });
    }
    return { user: context.user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  return (
    <>
      <Sidebar user={user} />
      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
