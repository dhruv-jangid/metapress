import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useLocation } from "@tanstack/react-router";
import { Book02Icon, Home09Icon, Login01Icon, PenTool03Icon } from "@hugeicons/core-free-icons";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import type { IconSvgElement } from "@hugeicons/react";

const navLinks: Array<{ title: string; url: string; icon: IconSvgElement }> = [
  {
    title: "Home",
    url: "/",
    icon: Home09Icon,
  },
  {
    title: "Feed",
    url: "/feed",
    icon: Book02Icon,
  },
];

export const Navbar = ({ user }: { user: UserSession | null }) => {
  const pathname = useLocation().pathname;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Explore</SidebarGroupLabel>
      <SidebarMenu>
        {navLinks.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title} isActive={item.url === pathname}>
              <Link to={item.url} className="flex items-center gap-2 w-full">
                <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                <span className="mt-0.5">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={user ? "Create" : "Login"}
            isActive={user ? "/create-blog" === pathname : "/sign-in" === pathname}
          >
            <Link
              to={user ? "/create-blog" : "/sign-in"}
              className="flex items-center gap-2 w-full"
            >
              <HugeiconsIcon icon={user ? PenTool03Icon : Login01Icon} strokeWidth={2} />
              <span className="mt-0.5">{user ? "Create" : "Login"}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};
