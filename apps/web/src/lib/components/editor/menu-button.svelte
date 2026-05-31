<script lang="ts">
  import type { IconSvgElement } from "@hugeicons/svelte";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  const {
    onclick,
    isActive,
    icon: Icon,
    tooltip,
    disabled = false,
    iconClasses,
  }: {
    onclick: () => void;
    isActive?: boolean;
    icon: IconSvgElement;
    tooltip?: string;
    disabled?: boolean;
    iconClasses?: string;
  } = $props();
</script>

<button
  {onclick}
  type="button"
  title={tooltip}
  {disabled}
  class={`cursor-pointer px-3.5 py-3 outline transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
    isActive && "bg-muted-foreground text-primary-foreground"
  }`}
>
  <HugeiconsIcon icon={Icon} size={16} class={`${iconClasses}`} />
</button>
