import { browser } from "$app/environment";
import { QueryCache, QueryClient } from "@tanstack/svelte-query";

import type { LayoutLoad } from "./$types";

const STALE_GC_TIME = 1000 * 60 * 60 * 24;

export const load: LayoutLoad = async ({ data }) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        console.error(`Error: ${error.message}`);
      },
    }),
    defaultOptions: {
      queries: {
        enabled: browser,
        staleTime: STALE_GC_TIME,
        gcTime: STALE_GC_TIME,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        placeholderData: (prevData: unknown) => prevData,
      },
    },
  });

  return { queryClient, ...data };
};
