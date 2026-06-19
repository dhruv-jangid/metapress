<script lang="ts">
  import { baseClasses } from "$lib/components/editor/styles";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "$lib/components/ui/drawer";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { FullScreenIcon, Upload } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import type { BlogContent } from "@metapress/contracts/blogs";
  import { Extensions } from "@metapress/editor";
  import { generateHTML } from "@tiptap/html";

  const {
    title = $bindable(),
    category = $bindable(),
    content = $bindable(),
    loading = $bindable(),
    onclick,
  }: {
    title: string;
    category: string;
    content?: BlogContent;
    loading: boolean;
    onclick: () => void;
  } = $props();
</script>

<Drawer dismissible={!loading} direction="right">
  <DrawerTrigger disabled={loading || !category || !title}>
    {#snippet child({ props })}
      <Button {...props} size="lg">
        Preview <HugeiconsIcon icon={FullScreenIcon} />
      </Button>
    {/snippet}
  </DrawerTrigger>
  <DrawerContent class="min-w-3xl">
    <DrawerHeader class="space-y-1.5">
      <DrawerTitle class="line-clamp-2 font-sans text-6xl tracking-tighter wrap-break-word"
        >{title}</DrawerTitle
      >
      <DrawerDescription>
        {#snippet child({ props })}
          <Badge {...props} class="text-xs">{category}</Badge>
        {/snippet}
      </DrawerDescription>
    </DrawerHeader>
    <ScrollArea class="mx-auto h-[70%] min-w-full cursor-text px-4">
      <article class={baseClasses}>
        {#if content}
          {@html generateHTML(content, Extensions())}
        {/if}
      </article>
    </ScrollArea>
    <DrawerFooter>
      <Button size="lg" disabled={loading || !category || !title} {onclick}>
        {#if loading}
          Publishing...
        {:else}
          Publish
          <HugeiconsIcon icon={Upload} />
        {/if}
      </Button>
      <DrawerClose>
        <Button variant="outline" disabled={loading} class="w-full">Edit Again</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
