<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import UserGrid from "$lib/components/user-grid.svelte";
  import { orpc } from "$lib/orpc";
  import { createQuery } from "@tanstack/svelte-query";

  const { data } = $props();

  const user = createQuery(() =>
    orpc.user.getWithBlogs.queryOptions({ input: { username: data.username } }),
  );
</script>

<div class="flex min-h-dvh flex-col items-center">
  <div class="flex w-full justify-center gap-8 pt-12 pb-14 lg:pt-14 lg:pb-16 xl:gap-12 xl:py-18">
    {#if user.isLoading}
      <Skeleton class="h-32 w-md rounded-4xl" />
    {/if}

    {#if user.isSuccess}
      <div class="mt-2 lg:mt-1 xl:mt-0">
        <Avatar class="aspect-square size-24 lg:size-28 xl:size-32">
          <AvatarImage src={user.data.user.image ?? undefined} alt={user.data.user.name} />
          <AvatarFallback class="text-3xl">{user.data.user.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>

      <div class="space-y-2">
        <div class="text-3xl tracking-tight lg:text-4xl">{user.data.user.username}</div>
        <div class="inline-flex items-center gap-2">
          {user.data.blogs.blogs.length}
          <span class="text-muted-foreground">Blogs</span>
        </div>
        <div class="flex items-center gap-2 text-lg font-medium tracking-tight opacity-85">
          {user.data.user.name}
          {#if user.data.user.role === "admin"}
            <Badge variant="destructive">{user.data.user.role.toUpperCase()}</Badge>
          {/if}
        </div>
      </div>{/if}
  </div>

  {#if user.isLoading}
    <div class="w-full lg:px-8 xl:px-16">
      <Skeleton class="h-[70dvh] w-full rounded-4xl" />
    </div>
  {/if}

  {#if user.isSuccess && user.data.blogs.blogs.length > 0}
    <div class="min-h-[60dvh] w-full md:min-h-[68dvh] lg:px-8 xl:px-16">
      <UserGrid blogs={user.data.blogs.blogs} />
    </div>
  {/if}

  {#if user.isSuccess && user.data.blogs.blogs.length < 1}
    <Separator />

    <div
      class="text-muted-foreground flex min-h-[75dvh] w-full items-center justify-center text-center text-4xl"
    >
      {#if user.data.user.isSelf}
        <a href="/create-blog">
          <Button variant="secondary">Create your first blog</Button>
        </a>
      {:else}
        <div class="tracking-tighter">This user have not published any blogs yet!</div>
      {/if}
    </div>
  {/if}
</div>
