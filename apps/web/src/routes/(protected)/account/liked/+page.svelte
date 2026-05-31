<script lang="ts">
  import Grid from "$lib/components/grid.svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { orpc } from "$lib/orpc";
  import { createQuery } from "@tanstack/svelte-query";

  const blogs = createQuery(() => orpc.user.getLikedBlogs.queryOptions());
</script>

<div class="min-h-[92dvh]">
  <div class="my-16 text-center text-4xl">Liked Blogs</div>

  {#if blogs.isLoading}
    <div class="grid grid-cols-1 gap-6 p-4 md:p-8 lg:grid-cols-2 xl:gap-10 2xl:grid-cols-3">
      {#each Array(9)}
        <Skeleton class="h-72 w-full rounded-4xl" />
      {/each}
    </div>
  {/if}

  {#if blogs.isSuccess && blogs.data.blogs.length > 0}
    <Grid blogs={blogs.data.blogs} />
  {/if}
</div>

{#if !blogs.isSuccess || blogs.data.blogs.length < 1}
  <div class="mx-auto flex min-h-dvh w-3/4 items-center justify-center rounded-lg text-4xl">
    You dont have any liked blogs currently!
  </div>
{/if}
