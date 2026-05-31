<script lang="ts">
  import { orpc } from "$lib/orpc";
  import { Heart } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { createMutation } from "@tanstack/svelte-query";
  import { toast } from "svelte-sonner";

  const {
    blogId,
    likes,
    isLiked,
  }: {
    blogId: string;
    likes: number;
    isLiked: boolean;
  } = $props();

  let tempLikes = $derived(likes);
  let tempIsLiked = $derived(isLiked);
  let isRequestInFlight = false;

  const likeMutation = createMutation(() => orpc.blog.like.mutationOptions());

  const unLikeMutation = createMutation(() => orpc.blog.unLike.mutationOptions());

  const handleLikeUnlike = async () => {
    if (isRequestInFlight) {
      return;
    }

    const newLikedState = !tempIsLiked;
    const prevLiked = tempIsLiked;
    const prevLikes = tempLikes;

    tempIsLiked = newLikedState;
    tempLikes = newLikedState ? tempLikes + 1 : tempLikes - 1;
    isRequestInFlight = true;

    try {
      if (newLikedState) {
        await likeMutation.mutateAsync({ blogId });
      } else {
        await unLikeMutation.mutateAsync({ blogId });
      }
    } catch (error) {
      tempIsLiked = prevLiked;
      tempLikes = prevLikes;
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      isRequestInFlight = false;
    }
  };
</script>

<div class="flex items-center gap-1 antialiased">
  <div class="flex cursor-pointer items-center gap-1 text-pretty">
    <HugeiconsIcon
      onclick={handleLikeUnlike}
      icon={Heart}
      strokeWidth={1}
      size={32}
      class={tempIsLiked ? "fill-red-600 stroke-red-600" : "stroke-muted-foreground/50"}
    />
    <span class="text-lg tracking-tight">{tempLikes}</span>
  </div>
</div>
