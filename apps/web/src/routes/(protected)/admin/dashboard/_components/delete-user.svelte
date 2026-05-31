<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import { Button } from "$lib/components/ui/button";
  import { show } from "$lib/hooks/alert-dialog.svelte";
  import { Trash2 } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { toast } from "svelte-sonner";

  const { userId }: { userId: string } = $props();

  let loading = $state(false);

  const deleteUserAdmin = async () => {
    loading = true;
    const toastId = toast.loading("Deleting...");
    try {
      const { error } = await authClient.admin.removeUser({ userId });
      if (error) {
        throw new Error(error.message);
      }

      toast.success(`Deleted user with id: ${userId}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      loading = false;
      toast.dismiss(toastId);
    }
  };
</script>

<Button
  variant="destructive"
  size="icon"
  disabled={loading}
  onclick={() =>
    show({
      title: "Delete user?",
      description: `ID: ${userId}`,
      actionLabel: "Delete",
      onConfirm: deleteUserAdmin,
    })}
>
  <HugeiconsIcon icon={Trash2} size={18} />
</Button>
