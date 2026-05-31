<script lang="ts">
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client";
  import { Button } from "$lib/components/ui/button";
  import { toast } from "svelte-sonner";

  const signOut = async () => {
    try {
      await authClient.signOut({}, { throw: true });

      await goto("/sign-in", { replaceState: true, invalidateAll: true });
    } catch {
      toast.error("Something went wrong");
    }
  };
</script>

<Button variant="destructive" onclick={() => signOut()}>Logout</Button>
