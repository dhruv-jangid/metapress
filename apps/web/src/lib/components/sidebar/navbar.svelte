<script lang="ts">
  import { page } from "$app/state";
  import { Book02Icon, Home09Icon, Login01Icon, PenTool03Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/svelte";

  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "../ui/sidebar";

  const navLinks: { title: string; url: string; icon: IconSvgElement }[] = [
    {
      title: "Home",
      url: "/browse",
      icon: Home09Icon,
    },
    {
      title: "Feed",
      url: "/feed",
      icon: Book02Icon,
    },
  ];
</script>

<SidebarGroup>
  <SidebarGroupLabel>Explore</SidebarGroupLabel>
  <SidebarMenu>
    {#each navLinks as item}
      <SidebarMenuItem>
        <SidebarMenuButton tooltipContent={item.title} isActive={item.url === page.url.pathname}>
          <a href={item.url} class="flex w-full items-center gap-2">
            <HugeiconsIcon icon={item.icon} strokeWidth={2} />
            <span class="mt-0.5">{item.title}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    {/each}
    <SidebarMenuItem>
      <SidebarMenuButton tooltipContent="Create" isActive={page.url.pathname === "/create-blog"}>
        <a href={"/create-blog"} class="flex w-full items-center gap-2">
          <HugeiconsIcon icon={PenTool03Icon} strokeWidth={2} />
          <span class="mt-0.5">Create</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroup>
