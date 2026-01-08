import { createFileRoute } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { z } from "zod";
import { SigninForm } from "./-components/sign-in-form";

export const Route = createFileRoute("/(auth)/sign-in")({
  validateSearch: z.object({
    passwordChanged: z.coerce.boolean().optional(),
  }),
  head: () => ({
    meta: [{ title: "Sign In" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { passwordChanged } = Route.useSearch();

  return (
    <div className="h-dvh max-h-dvh flex w-full">
      <Image
        src="/images/flowers.jpg"
        alt="Flowers Image"
        layout="fullWidth"
        priority
        className="border-r relative object-cover brightness-90 dark:brightness-75 sepia-50 h-full w-5/12 hidden lg:block"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent/10 w-5/12 hidden lg:block" />
      <div className="absolute bottom-0 left-0 z-10 w-5/12 p-8 xl:p-12 text-balance hidden lg:block">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-stone-50">Welcome back</h1>
        <p className="text-lg text-primary font-medium max-w-md">
          Pick up where you left off and connect with your audience.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full lg:w-7/12">
        {passwordChanged && (
          <div className="mb-8">
            <p className="text-muted-foreground tracking-tighter border px-2.5 rounded-2xl bg-accent">
              PASSWORD CHANGED SUCCESSFULLY!
            </p>
          </div>
        )}
        <SigninForm />
      </div>
    </div>
  );
}
