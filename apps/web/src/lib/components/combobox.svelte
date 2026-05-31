<script lang="ts">
  import { Button } from "$lib/components/ui/button/index";
  import { cn } from "$lib/utils";
  import { Check, UnfoldMoreIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "./ui/command";
  import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

  let {
    array,
    placeholder,
    value = $bindable(),
    loading = false,
  }: {
    array: string[];
    placeholder: string;
    value: string;
    loading?: boolean;
  } = $props();

  let open = $state(false);
</script>

<Popover bind:open>
  <PopoverTrigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="outline"
        class="w-50 justify-between"
        role="combobox"
        aria-expanded={open}
        disabled={loading}
      >
        {value || placeholder}
        <HugeiconsIcon icon={UnfoldMoreIcon} class="opacity-50" />
      </Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverContent class="w-50 p-0">
    <Command>
      <CommandInput placeholder={`Search ${placeholder}`} class="h-9" />
      <CommandList>
        <CommandEmpty>Try a different search</CommandEmpty>
        <CommandGroup>
          {#each array as item}
            <CommandItem
              value={item}
              onSelect={() => {
                value = item === value ? "" : item;
                open = false;
              }}
            >
              {item}
              <HugeiconsIcon
                icon={Check}
                class={cn("ml-auto", value === item ? "opacity-100" : "opacity-0")}
              />
            </CommandItem>
          {/each}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
