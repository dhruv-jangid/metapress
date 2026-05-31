<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import type { Readable } from "svelte/store";

  import { Separator } from "../ui/separator";
  import type { SlashItem, SlashMenuGrouped } from "./menu-items";

  type SuggestionProps = {
    items: SlashMenuGrouped;
    command: (item: SlashItem) => void;
  };

  type IndexedGroup = {
    category: string;
    items: { item: SlashItem; index: number }[];
  };

  let { suggestion }: { suggestion: Readable<SuggestionProps> } = $props();

  let selectedIndex = $state(0);
  let viewportRef: HTMLDivElement | undefined = $state(undefined);

  let items = $derived($suggestion.items);
  let command = $derived($suggestion.command);
  let flatItems = $derived(Object.values(items).flat());
  let indexedGroups = $derived.by(() => {
    let index = 0;
    return Object.entries(items).map(([category, categoryItems]) => ({
      category,
      items: categoryItems.map((item) => ({ item, index: index++ })),
    }));
  });

  $effect(() => {
    viewportRef?.querySelector(`[data-item-index="${selectedIndex}"]`)?.scrollIntoView({
      block: "center",
    });
  });

  function selectItem(index: number) {
    const item = flatItems[index];
    if (item) command(item);
  }

  export function onKeyDown(e: KeyboardEvent) {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
    if (!navigationKeys.includes(e.key) || flatItems.length === 0) return false;

    e.preventDefault();

    if (e.key === "ArrowUp")
      selectedIndex = (selectedIndex + flatItems.length - 1) % flatItems.length;
    if (e.key === "ArrowDown") selectedIndex = (selectedIndex + 1) % flatItems.length;
    if (e.key === "Enter") selectItem(selectedIndex);

    return true;
  }
</script>

{#if flatItems.length > 0}
  <div
    class="bg-popover animate-in fade-in zoom-in-95 slide-in-from-top-1 w-80 origin-top-left overflow-hidden rounded-xl border shadow-xl inset-shadow-2xs duration-200"
  >
    <ScrollArea class="h-96" scrollbarYClasses="w-2!">
      <div bind:this={viewportRef}>
        {#each indexedGroups as { category, items: categoryItems }, groupIndex}
          <div class="m-1">
            {#if groupIndex > 0}
              <Separator class="mx-auto my-2 w-[95.2%]!" />
            {/if}

            <div class="text-muted-foreground mt-3 mb-1 ml-2 text-xs font-medium capitalize">
              {category}
            </div>

            {#each categoryItems as { item, index }}
              <button
                data-item-index={index}
                class:bg-accent={index === selectedIndex}
                class="hover:bg-accent flex w-full cursor-pointer gap-3 rounded-lg px-2.5 py-2"
                onclick={() => selectItem(index)}
              >
                <HugeiconsIcon icon={item.icon} size={18} />
                <div>
                  <div class="text-sm">{item.title}</div>
                </div>
              </button>
            {/each}
          </div>
        {/each}
      </div>
    </ScrollArea>
  </div>
{/if}
