import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ErrorComponent } from "./components/defaults/error";
import { LoadingComponent } from "./components/defaults/loading";
import { NotFoundComponent } from "./components/defaults/not-found";
import { routeTree } from "./routeTree.gen";

const STALE_GC_TIME = 1000 * 60 * 60 * 24;

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_GC_TIME,
        gcTime: STALE_GC_TIME,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultStaleTime: 1000 * 60 * 60 * 24,
    defaultGcTime: 1000 * 60 * 60 * 24,
    defaultErrorComponent: (error) => <ErrorComponent error={error} />,
    defaultNotFoundComponent: NotFoundComponent,
    defaultPendingComponent: LoadingComponent,
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
};
