import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { getSession } from "@/server/auth/auth.controller";
import { Providers } from "@/components/providers/providers";

export const Route = createRootRoute({
  beforeLoad: async () => {
    return { user: await getSession() };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        title: "MetaPress",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "description",
        content:
          "Enjoy the blogs that you love, upload original content and share it all with friends, family and the world on MetaPress.",
      },
      {
        name: "application-name",
        content: "MetaPress",
      },
      {
        name: "author",
        content: "Dhruv Jangid",
      },
      {
        name: "creator",
        content: "Dhruv Jangid",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "author",
        href: "https://github.com/dhruv-jangid",
      },
      { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
