<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import { onMount } from "svelte";

  onMount(async () => {
    try {
      if (window.opener) {
        const { data } = await authClient.getSession();

        if (data?.user) {
          window.opener.postMessage({ type: "oauth-success" }, window.location.origin);
        } else {
          window.opener.postMessage(
            { type: "oauth-error", message: "Authentication failed" },
            window.location.origin,
          );
        }
      } else {
        throw new Error("Something went wrong");
      }
    } catch {
      if (window.opener) {
        window.opener.postMessage(
          { type: "oauth-error", message: "Something went wrong" },
          window.location.origin,
        );
      } else {
        throw new Error("Something went wrong");
      }
    }
  });
</script>

<div class="flex h-dvh w-full items-center justify-center bg-white font-mono">
  <p>Just a moment...</p>
</div>
