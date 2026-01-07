import { createFileRoute } from "@tanstack/react-router";

import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "Contact" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col xl:flex-row gap-16 2xl:gap-24 m-4 xl:m-8 p-8 pt-24 xl:pt-32 min-h-[96dvh] xl:min-h-[94dvh]">
      <div className="space-y-4">
        <div className="text-sm text-primary">TALK TO US</div>
        <div className="text-3xl lg:text-4xl xl:text-5xl tracking-tighter w-xs lg:w-sm xl:w-md">
          What&apos;s an email we can reach you out?
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
