<script lang="ts">
  import type { BlogContent } from "@metapress/contracts/blogs";
  import { Editor, Extensions } from "@metapress/editor";
  import { onMount, onDestroy } from "svelte";
  import { toast } from "svelte-sonner";

  import { Skeleton } from "../ui/skeleton";
  import { getSlashItems } from "./menu-items";
  import { renderItems } from "./render-items";
  import { editorClasses } from "./styles";

  let { content = $bindable() }: { content?: BlogContent } = $props();

  // let bubbleMenu: HTMLElement | null = $state(null);
  let element: HTMLElement | null = $state(null);
  let editorState: { editor: Editor | null } = $state({ editor: null });

  onMount(() => {
    editorState.editor = new Editor({
      element,
      enableContentCheck: true,
      injectCSS: false,
      content,
      onUpdate: ({ editor }) => {
        content = editor.getJSON();
      },
      onTransaction: ({ editor }) => {
        // Update the state signal to force a re-render
        editorState = { editor };
      },
      extensions: Extensions({ items: getSlashItems, render: renderItems }),
    });

    editorState.editor.on("contentError", ({ error }) => toast.error(error.message));
  });

  onDestroy(() => editorState.editor?.destroy());
</script>

<div style="position: relative" class="app">
  {#if !editorState.editor}
    <Skeleton class="h-8 w-full rounded-4xl" />
  {/if}

  <div bind:this={element} class={editorClasses}></div>
</div>

<style>
  :global(.drag-handle) {
    @apply cursor-grab select-none active:cursor-grabbing;
  }
</style>
