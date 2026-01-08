import { createFileRoute } from "@tanstack/react-router";
import { ForgetPasswordForm } from "./-components/forget-pass-form";

export const Route = createFileRoute("/(auth)/forget-password")({
  head: () => ({
    meta: [{ title: "Forget Password" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col xl:flex-row gap-16 2xl:gap-24 m-4 xl:m-8 p-8 pt-24 xl:pt-32 min-h-[96dvh] xl:min-h-[94dvh]">
      <div className="space-y-4">
        <div className="text-sm text-primary">FORGET PASSWORD</div>
        <div className="text-3xl lg:text-4xl xl:text-5xl tracking-tighter w-xs lg:w-sm xl:w-md">
          Verify your identity to recover your account. Just a moment, this won&apos;t take much.
        </div>
      </div>
      <div className="xl:w-md">
        <ForgetPasswordForm />
      </div>
    </div>
  );
}
