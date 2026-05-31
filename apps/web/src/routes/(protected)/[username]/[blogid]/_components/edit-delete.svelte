<script lang="ts">
  import { goto } from "$app/navigation";
  import { show } from "$lib/hooks/alert-dialog.svelte";
  import { orpc } from "$lib/orpc";
  import { cn } from "$lib/utils";
  import { PencilLine, Trash2 } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { createMutation } from "@tanstack/svelte-query";
  import { toast } from "svelte-sonner";

  import { Button } from "../../../../../lib/components/ui/button";

  const {
    title,
    blogId,
    isMobile = false,
  }: { title: string; blogId: string; isMobile?: boolean } = $props();

  const deleteBlogMutation = createMutation(() => orpc.blog.delete.mutationOptions());

  const handleDeleteBlog = async () => {
    const toastId = toast.loading("Deleting...");

    try {
      await deleteBlogMutation.mutateAsync({ blogId });

      goto("/browse", { replaceState: true, invalidate: ["/api/blogs"] });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      toast.dismiss(toastId);
    }
  };
</script>

<div class={cn(isMobile ? "block lg:hidden" : "hidden lg:block", "mt-3 space-x-4")}>
  <Button
    onclick={() => {
      show({
        title: "Edit this blog?",
        description: `Title: ${title}`,
        actionLabel: "Edit",
        onConfirm: () => goto(`/edit-blog/${blogId}`),
      });
    }}
  >
    <HugeiconsIcon icon={PencilLine} /> Edit
  </Button>
  <Button
    variant="destructive"
    onclick={() =>
      show({
        title: "Delete this blog?",
        actionLabel: "Delete",
        onConfirm: handleDeleteBlog,
      })}
  >
    <HugeiconsIcon icon={Trash2} />
  </Button>
</div>
