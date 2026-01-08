import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ResetPasswordForm } from "./-components/reset-pass-form";

export const Route = createFileRoute("/(auth)/reset-password")({
  validateSearch: (search) =>
    z
      .object({
        token: z.string(),
      })
      .parse(search),
  head: () => ({
    meta: [{ title: "Reset Password" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = Route.useSearch();

  return (
    <div className="flex flex-col xl:flex-row gap-16 2xl:gap-24 m-4 xl:m-8 p-8 pt-24 xl:pt-32 min-h-[96dvh] xl:min-h-[94dvh]">
      <div className="space-y-4">
        <div className="text-sm text-primary">RESET PASSWORD</div>
        <div className="text-3xl lg:text-4xl xl:text-5xl tracking-tighter w-xs lg:w-sm xl:w-md">
          Just a reminder that this action can&apos;t be undone. Also, this link is valid only for 1
          hour
        </div>
      </div>
      <div className="xl:w-md">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
