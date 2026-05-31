<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import { SidebarLeft01Icon, SidebarRight01Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import type { ComponentProps } from "svelte";

  import { useSidebar } from "./context.svelte.js";

  let {
    ref = $bindable(null),
    class: className,
    onclick,
    ...restProps
  }: ComponentProps<typeof Button> & {
    onclick?: (e: MouseEvent) => void;
  } = $props();

  const sidebar = useSidebar();
</script>

<Button
  bind:ref
  data-sidebar="trigger"
  data-slot="sidebar-trigger"
  variant="ghost"
  size="icon-sm"
  class={cn("cn-sidebar-trigger bg-accent fixed mt-2.5 ml-2.5 rounded-xl", className)}
  type="button"
  onclick={(e) => {
    onclick?.(e);
    sidebar.toggle();
  }}
  {...restProps}
>
  {#if sidebar.open}
    <HugeiconsIcon icon={SidebarLeft01Icon} strokeWidth={2} />
  {:else}
    <HugeiconsIcon icon={SidebarRight01Icon} strokeWidth={2} />
  {/if}
  <span class="sr-only">Toggle Sidebar</span>
</Button>
