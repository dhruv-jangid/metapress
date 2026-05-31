<script lang="ts">
  import { Copy } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { toast } from "svelte-sonner";

  import Button from "../../../../../lib/components/ui/button/button.svelte";
  import { Separator } from "../../../../../lib/components/ui/separator";

  const { username, blogId }: { username: string; blogId: string } = $props();

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${username}/${blogId}`);

      toast.success("Link copied to clipboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
</script>

<div class="mb-16 space-y-4">
  <Separator />

  <div class="flex justify-between">
    <div class="text-muted-foreground tracking-tight">Share this blog</div>

    <div>
      <Button size="sm" onclick={copyLink}>
        <HugeiconsIcon icon={Copy} /> Copy Link
      </Button>
    </div>
  </div>
</div>
