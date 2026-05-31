<script lang="ts">
  import Grid from "$lib/components/grid.svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { orpc } from "$lib/orpc";
  import { createQuery } from "@tanstack/svelte-query";

  const blogs = createQuery(() => orpc.blog.getFeed.queryOptions());
</script>

<div class="min-h-dvh">
  <div
    class="border-accent-foreground/50 mt-16 mr-6 ml-auto w-2xs border-b border-dashed pb-2 text-end text-3xl tracking-tight lg:mr-12 lg:w-md lg:text-4xl"
  >
    ... Feed
  </div>

  {#if blogs.isLoading}
    <div class="grid grid-cols-1 gap-6 p-4 md:p-8 lg:grid-cols-2 xl:gap-10 2xl:grid-cols-3">
      {#each Array(9)}
        <Skeleton class="h-72 w-full rounded-4xl" />
      {/each}
    </div>
  {/if}

  {#if blogs.isSuccess && blogs.data.length > 0}
    <Grid blogs={blogs.data} />
  {/if}
</div>

{#if blogs.isSuccess && blogs.data.length < 1}
  <div class="mx-auto flex min-h-dvh w-3/4 items-center justify-center rounded-lg text-4xl">
    There are currently no blogs to display!
  </div>
{/if}
