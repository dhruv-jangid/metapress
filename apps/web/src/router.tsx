import { createRouter } from "@tanstack/react-router";

import { Error } from "./components/error";
import { routeTree } from "./routeTree.gen";
import { Loading } from "./components/loading";
import { NotFound } from "./components/not-found";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: Error,
    defaultNotFoundComponent: NotFound,
    defaultPendingComponent: Loading,
  });

  return router;
};
