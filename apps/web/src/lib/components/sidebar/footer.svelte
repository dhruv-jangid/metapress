<script lang="ts">
  import { goto } from "$app/navigation";
  import { authClient, type UserSession } from "$lib/auth-client";
  import {
    AllBookmarkIcon,
    ArrowUpRight01Icon,
    AtSign,
    File01Icon,
    HelpCircleIcon,
    LogOut,
    MessageMultiple01Icon,
    Moon02Icon,
    Orbit01Icon,
    Settings2,
    Sun01Icon,
    UnfoldMoreIcon,
  } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { mode, setMode } from "mode-watcher";

  import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu";
  import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";

  const { user }: { user: UserSession } = $props();

  const sidebar = useSidebar();

  const handleSignOut = async () => {
    try {
      const { data } = await authClient.signOut();
      if (data?.success) {
        await goto("/sign-in", { replaceState: true, invalidateAll: true });
      }
    } catch {}
  };
</script>

<SidebarMenu>
  <SidebarMenuItem>
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet child({ props })}
          <SidebarMenuButton
            {...props}
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{user.name}</span>
              <span class="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
            <HugeiconsIcon icon={UnfoldMoreIcon} class="ml-auto size-4" />
          </SidebarMenuButton>
        {/snippet}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        class="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        side={sidebar.isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">{user.name}</span>
                <span class="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onclick={() => setMode(mode.current === "light" ? "dark" : "light")}>
            <HugeiconsIcon icon={mode.current === "light" ? Moon02Icon : Sun01Icon} />
            {mode.current === "light" ? "Dark Theme" : "Light Theme"}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onclick={() => goto(`/${user.username}`)}>
            <HugeiconsIcon icon={AtSign} />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onclick={() => goto("/account/profile")}>
            <HugeiconsIcon icon={Settings2} />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onclick={() => goto("/account/liked")}>
            <HugeiconsIcon icon={AllBookmarkIcon} />
            Liked Blogs
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger class="gap-2.5">
            <HugeiconsIcon icon={Orbit01Icon} />
            Help
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent class="min-w-50">
            <a href="/about" target="_blank">
              <DropdownMenuItem class="group">
                <HugeiconsIcon icon={HelpCircleIcon} />
                About
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  class="ml-auto hidden opacity-50 group-hover:block"
                />
              </DropdownMenuItem>
            </a>
            <a href="/policies" target="_blank">
              <DropdownMenuItem class="group">
                <HugeiconsIcon icon={File01Icon} />
                Terms & policies
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  class="ml-auto hidden opacity-50 group-hover:block"
                />
              </DropdownMenuItem>
            </a>
            <a href="/contact" target="_blank">
              <DropdownMenuItem class="group">
                <HugeiconsIcon icon={MessageMultiple01Icon} />
                Contact
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  class="ml-auto hidden opacity-50 group-hover:block"
                />
              </DropdownMenuItem>
            </a>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem class="text-destructive hover:bg-destructive/20!" onclick={handleSignOut}>
          <HugeiconsIcon icon={LogOut} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
</SidebarMenu>
