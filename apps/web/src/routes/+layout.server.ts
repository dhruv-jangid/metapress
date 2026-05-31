import { authClient } from "$lib/auth-client";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ request, fetch }) => {
  const { data } = await authClient.getSession({
    fetchOptions: { headers: request.headers, customFetchImpl: fetch },
  });

  return { user: data?.user };
};
