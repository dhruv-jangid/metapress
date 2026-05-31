import { PUBLIC_SERVER_URL } from "$env/static/public";
import type { RouterClient } from "@metapress/api/router";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

export const createORPC = (cookie = "") => {
  const link = new RPCLink({
    url: `${PUBLIC_SERVER_URL}/api`,
    fetch: (request, options) => fetch(request, { ...options, credentials: "include" }),
    headers: cookie ? { cookie } : undefined,
  });

  const client = createORPCClient<RouterClient>(link);

  return createTanstackQueryUtils(client);
};

export const orpc = createORPC();
