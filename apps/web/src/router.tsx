import { createRouter } from "@tanstack/react-router";
import { ErrorComponent } from "./components/error";
import { LoadingComponent } from "./components/loading";
import { NotFoundComponent } from "./components/not-found";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultStaleTime: 1000 * 60 * 60 * 24,
    defaultGcTime: 1000 * 60 * 60 * 24,
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: NotFoundComponent,
    defaultPendingComponent: LoadingComponent,
  });

  return router;
};
