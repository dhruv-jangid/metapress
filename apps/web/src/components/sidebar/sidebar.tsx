import { Sidebar as SB, SidebarContent, SidebarFooter, SidebarHeader } from "../ui/sidebar";
import { Header } from "./header";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export const Sidebar = ({
  user,
  ...props
}: React.ComponentProps<typeof SB> & { user: UserSession | null }) => {
  return (
    <SB collapsible="icon" {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>

      <SidebarContent>
        <Navbar user={user} />
      </SidebarContent>

      <SidebarFooter>
        <Footer user={user} />
      </SidebarFooter>
    </SB>
  );
};
