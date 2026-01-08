import { QuillWriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export const Header = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="w-max">
        <SidebarMenuButton tooltip="MetaPress" className="hover:bg-transparent mt-0.5">
          <Link to="/" className="inline-flex gap-1 items-center">
            <HugeiconsIcon icon={QuillWriteIcon} strokeWidth={2} className="size-5!" />
            <span className="text-base tracking-tight">MetaPress</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
