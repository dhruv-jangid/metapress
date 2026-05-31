<script lang="ts">
  import { show } from "$lib/hooks/alert-dialog.svelte";
  import { orpc } from "$lib/orpc";
  import { getFirstZodError } from "$lib/utils";
  import { MessageSquareText, Trash2 } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import type { BlogComment } from "@metapress/api/schemas/comment";
  import { createMutation } from "@tanstack/svelte-query";
  import { toast } from "svelte-sonner";
  import { ZodError } from "zod";

  import { Avatar, AvatarFallback, AvatarImage } from "../../../../../lib/components/ui/avatar";
  import { Button } from "../../../../../lib/components/ui/button";
  import { Textarea } from "../../../../../lib/components/ui/textarea";

  const {
    blogId,
    comments,
    isAuthor,
    username,
  }: {
    blogId: string;
    comments: BlogComment[];
    isAuthor: boolean;
    username: string;
  } = $props();

  let comment = $state("");
  let loading = $state(false);
  let commentsList = $derived(comments);

  const createCommentMutation = createMutation(() => orpc.comment.create.mutationOptions());

  const deleteCommentMutation = createMutation(() => orpc.comment.delete.mutationOptions());

  const handleAddComment = async () => {
    loading = true;
    try {
      const newComment = await createCommentMutation.mutateAsync({ blogId, content: comment });
      comment = "";
      commentsList = [...commentsList, newComment];
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(getFirstZodError(error));
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      loading = false;
    }
  };

  const handleDeleteComment = async (blogIdX: string, commentX: BlogComment) => {
    try {
      await deleteCommentMutation.mutateAsync({ commentId: commentX.id, blogId: blogIdX });
      commentsList = commentsList.filter((c) => c.id !== commentX.id);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
</script>

<div class="w-4/5 space-y-6 tracking-tight text-balance">
  <div class="relative flex flex-col gap-2">
    <Textarea
      name="comment"
      id="comment"
      placeholder="Add a comment..."
      class="min-h-32 resize-none"
      maxlength={100}
      disabled={loading}
      bind:value={comment}
    />
    <span class="text-muted-foreground absolute right-4 bottom-12 text-xs tracking-tight">
      {comment.length}/100
    </span>
    <div class="flex justify-end gap-2.5 sm:gap-4">
      <Button size="sm" onclick={handleAddComment} disabled={loading || !comment.trim()}>
        {#if loading}
          ...
        {:else}
          Comment <HugeiconsIcon icon={MessageSquareText} />
        {/if}
      </Button>
    </div>
  </div>

  {#each commentsList as c}
    <div class="border-input bg-input/20 flex justify-between rounded-xl border p-4">
      <div class="flex gap-3">
        <a href={`/${c.authorUsername}`} class="relative h-8 w-8 overflow-hidden rounded-full">
          <Avatar>
            <AvatarImage src={c.authorImage || undefined} alt={c.authorName} />
            <AvatarFallback>{c.authorName[0].toUpperCase() || "M"}</AvatarFallback>
          </Avatar>
        </a>
        <div class="flex flex-col gap-0.5">
          <a
            href={`/${c.authorUsername}`}
            class="line-clamp-1 w-fit text-sm font-medium hover:animate-pulse"
          >
            {c.authorName}
          </a>
          <span class="text-sm text-neutral-400">
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }).format(new Date(c.createdAt))}
          </span>
          <p class="mt-4">{c.content}</p>
        </div>
      </div>
      {#if isAuthor || c.authorUsername === username}
        <HugeiconsIcon
          icon={Trash2}
          size={16}
          class="mt-0.5 mr-0.5 cursor-pointer stroke-red-600"
          onclick={() =>
            show({
              title: "Delete comment?",
              description: c.content,
              actionLabel: "Delete",
              onConfirm: () => handleDeleteComment(blogId, c),
            })}
        />
      {/if}
    </div>
  {/each}
</div>
