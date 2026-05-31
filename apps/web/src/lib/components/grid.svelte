<script lang="ts">
  import { ArrowUpRight } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import type { Blog } from "@metapress/api/schemas/common";
  import { Image } from "@unpic/svelte";

  import { Badge } from "./ui/badge";

  const { blogs }: { blogs: Blog[] } = $props();
</script>

<div class="grid grid-cols-1 gap-6 p-4 md:p-8 lg:grid-cols-2 xl:gap-10 2xl:grid-cols-3">
  {#each blogs as { id, title, cover, category, createdAt, author }}
    <div class="flex overflow-hidden rounded-4xl border">
      <Image
        src={cover}
        alt={title}
        layout="fullWidth"
        class="aspect-7/12 max-w-36 border-r object-cover md:max-w-40 lg:max-w-36 xl:max-w-48"
      />

      <div class="bg-accent inline-flex min-h-72 w-full flex-col justify-between p-6">
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2.5 text-sm">
            <time>
              {new Intl.DateTimeFormat("en-GB", {
                month: "short",
                day: "2-digit",
                year: "2-digit",
              }).format(new Date(createdAt))}
            </time>
            <Badge>{category}</Badge>
          </div>

          <span class="line-clamp-2 max-w-xs text-2xl font-medium tracking-tighter">
            {title}
          </span>

          <a
            href="/{author.username}/{id}"
            class="mt-3 inline-flex items-center gap-1 text-lg tracking-tight underline decoration-dotted underline-offset-4"
          >
            Read <HugeiconsIcon icon={ArrowUpRight} size={14} />
          </a>
        </div>

        <span class="truncate text-sm">
          by{" "}
          <a
            href="/{author.username}"
            class="inline-flex items-center gap-0.5 font-medium tracking-tight underline decoration-dotted underline-offset-4 opacity-70"
          >
            {author.name}
            <HugeiconsIcon icon={ArrowUpRight} size={12} />
          </a>
        </span>
      </div>
    </div>
  {/each}
</div>
