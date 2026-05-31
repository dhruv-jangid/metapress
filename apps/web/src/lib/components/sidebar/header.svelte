<script lang="ts">
  import { QuillWriteIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
</script>

<SidebarMenu>
  <SidebarMenuItem class="w-max">
    <SidebarMenuButton tooltipContent="MetaPress" class="mt-0.5 hover:bg-transparent">
      <a href="/" class="inline-flex items-center gap-1">
        <HugeiconsIcon icon={QuillWriteIcon} strokeWidth={2} class="size-5!" />
        <span class="text-base tracking-tight">MetaPress</span>
      </a>
    </SidebarMenuButton>
  </SidebarMenuItem>
</SidebarMenu>
