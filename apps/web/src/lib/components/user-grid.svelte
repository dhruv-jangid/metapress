<script lang="ts">
  import { Image } from "@unpic/svelte";

  const { blogs } = $props();
</script>

<div class="grid grid-cols-3 gap-1 overflow-hidden lg:rounded-4xl lg:border 2xl:grid-cols-4">
  {#each blogs as { id, title, cover, author }}
    <div class="group relative flex aspect-square flex-col justify-end overflow-hidden outline">
      <a href="/{author.username}/{id}" class="relative block h-full">
        <Image
          src={cover}
          alt={title}
          layout="fullWidth"
          priority={false}
          class="aspect-square cursor-pointer object-cover"
        />
        <div
          class="absolute inset-0 line-clamp-3 flex w-full translate-y-8 items-center justify-center gap-2 px-2 text-center text-lg text-balance opacity-0 backdrop-blur-xl transition-all duration-200 group-hover:translate-y-0 group-hover:bg-black/20 group-hover:opacity-100"
        >
          {title}
        </div>
      </a>
    </div>
  {/each}
</div>
