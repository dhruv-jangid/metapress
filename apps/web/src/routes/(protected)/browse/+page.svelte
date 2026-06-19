<script lang="ts">
  import Author from "$lib/components/author.svelte";
  import Grid from "$lib/components/grid.svelte";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { orpc } from "$lib/orpc";
  import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import type { Blog } from "@metapress/contracts/blogs";
  import { createQuery } from "@tanstack/svelte-query";
  import { Image } from "@unpic/svelte";

  const blogs = createQuery(() => orpc.blog.getFeed.queryOptions());
</script>

<section class="flex min-h-dvh flex-col xl:flex-row">
  <div
    class="mt-8 pl-6 text-9xl leading-24 tracking-tighter md:mt-12 md:pl-10 lg:w-5/12 lg:pl-12 xl:mt-16 xl:pl-16 2xl:w-1/2 2xl:text-[11rem] 2xl:leading-32"
  >
    <div>BL</div>
    <div class="ml-10">OG-</div>
    <div>NEW</div>
    <div class="flex items-center gap-8">
      <span>S</span>
      <span class="inline-flex flex-col text-2xl leading-5 lg:text-3xl lg:leading-6">
        <span class="w-max tracking-tight">Latest News </span>
        <span class="ml-10 w-max tracking-tight">and updates</span>
      </span>
    </div>
  </div>

  {#if blogs.isLoading}
    <div>
      <Skeleton class="my-16 h-108 w-xl rounded-4xl" />
      <Skeleton class="my-16 h-108 w-xl rounded-4xl" />
    </div>
  {/if}

  {#if blogs.isSuccess && blogs.data.length > 0}
    {@render VerticalList(blogs.data.slice(0, 2))}
  {/if}
</section>

<Separator />

{#if blogs.isLoading}
  <div class="grid grid-cols-1 gap-6 p-4 md:p-8 lg:grid-cols-2 xl:gap-10 2xl:grid-cols-3">
    {#each Array(6)}
      <Skeleton class="h-72 w-full rounded-4xl" />
    {/each}
  </div>
{/if}

{#if blogs.isSuccess && blogs.data.length > 0}
  <Grid blogs={blogs.data.slice(2)} />
{:else}
  <div
    class="mx-auto flex min-h-dvh w-xs items-center justify-center text-3xl tracking-tighter text-balance sm:w-sm md:text-4xl lg:w-lg lg:text-5xl xl:w-4xl xl:text-6xl"
  >
    Oops! There are no blogs to display currently, please come back later.
  </div>
{/if}

{#snippet VerticalList(blogs: Blog[])}
  <div class="[&>*:not(:last-child)]:border-b-2 [&>*:not(:last-child)]:border-dashed">
    {#each blogs as { id, title, cover, createdAt, category, author }}
      <div class="flex gap-4 px-4 py-8 md:px-8 lg:gap-6 lg:p-12 lg:py-12 lg:pr-8 xl:px-0 xl:py-16">
        <Image
          src={cover}
          alt={title}
          layout="fullWidth"
          class="aspect-3/4 max-w-48 rounded-[calc(var(--radius)*3)] object-cover lg:aspect-2/3 lg:max-w-64 xl:max-w-2xs"
        />

        <div class="inline-flex flex-col justify-between pt-2 pb-4 lg:pb-8">
          <div class="space-y-2 lg:space-y-3.5">
            <div class="inline-flex items-center gap-3 text-sm">
              <time>
                {new Intl.DateTimeFormat("en-GB", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(createdAt))}
              </time>
              <Badge>{category}</Badge>
            </div>

            <div
              class="line-clamp-3 max-w-2xs truncate text-3xl font-medium tracking-tighter text-balance md:max-w-xs lg:text-4xl"
            >
              {title}
            </div>

            <a href="/{author.username}/{id}" class="mt-2 lg:mt-4">
              <Button>
                Discover
                <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} class="-ml-1" />
              </Button>
            </a>
          </div>

          <div class="mt-16 lg:mt-0">
            <Author image={author.image} name={author.name} username={author.username} />
          </div>
        </div>
      </div>
    {/each}
  </div>
{/snippet}
