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
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
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

export const Footer = ({ user }: { user: UserSession | null }) => {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    try {
      const { data } = await authClient.signOut();
      if (data?.success) {
        navigate({ to: "/sign-in", reloadDocument: true, replace: true });
      }
    } catch {}
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={(props) => (
              <SidebarMenuButton
                {...props}
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? "M"} />
                  <AvatarFallback>{user?.name[0].toUpperCase() ?? "M"}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name ?? "Guest"}</span>
                  <span className="truncate text-xs">{user?.email ?? "Login to get started"}</span>
                </div>
                <HugeiconsIcon icon={UnfoldMoreIcon} className="ml-auto size-4" />
              </SidebarMenuButton>
            )}
          />

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                {user && (
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image ?? undefined} alt={user.name} />
                      <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                )}
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            {user && <DropdownMenuSeparator />}

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                <HugeiconsIcon icon={theme === "light" ? Moon02Icon : Sun01Icon} />
                {theme === "light" ? "Dark Theme" : "Light Theme"}
              </DropdownMenuItem>
            </DropdownMenuGroup>

            {user && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() =>
                      navigate({ to: "/$username", params: { username: user.username } })
                    }
                  >
                    <HugeiconsIcon icon={AtSign} />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/account/profile" })}>
                    <HugeiconsIcon icon={Settings2} />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/account/liked" })}>
                    <HugeiconsIcon icon={AllBookmarkIcon} />
                    Liked Blogs
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="gap-2.5">
                    <HugeiconsIcon icon={Orbit01Icon} />
                    Help
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="min-w-48">
                    <Link to="/about" target="_blank">
                      <DropdownMenuItem className="group">
                        <HugeiconsIcon icon={HelpCircleIcon} />
                        About
                        <HugeiconsIcon
                          icon={ArrowUpRight01Icon}
                          className="hidden group-hover:block opacity-50 ml-auto"
                        />
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/policies" target="_blank">
                      <DropdownMenuItem className="group">
                        <HugeiconsIcon icon={File01Icon} />
                        Terms & policies
                        <HugeiconsIcon
                          icon={ArrowUpRight01Icon}
                          className="hidden group-hover:block opacity-50 ml-auto"
                        />
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/contact" target="_blank">
                      <DropdownMenuItem className="group">
                        <HugeiconsIcon icon={MessageMultiple01Icon} />
                        Contact
                        <HugeiconsIcon
                          icon={ArrowUpRight01Icon}
                          className="hidden group-hover:block opacity-50 ml-auto"
                        />
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                  <HugeiconsIcon icon={LogOut} />
                  Log out
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
