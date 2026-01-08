import { createFileRoute } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { SignupForm } from "./-components/sign-up-form";

export const Route = createFileRoute("/(auth)/sign-up")({
  head: () => ({
    meta: [{ title: "Sign Up" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
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
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-stone-50">Capture your world</h1>
        <p className="text-lg text-primary font-medium max-w-md">
          Share your stories, ideas, and experiences with a community of creators who care.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full lg:w-7/12">
        <SignupForm />
      </div>
    </div>
  );
}
