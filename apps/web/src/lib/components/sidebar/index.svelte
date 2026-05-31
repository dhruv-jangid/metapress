<script lang="ts">
  import type { UserSession } from "$lib/auth-client";

  import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "../ui/sidebar";
  import Footer from "./footer.svelte";
  import Header from "./header.svelte";
  import Navbar from "./navbar.svelte";

  const { user }: { user: UserSession } = $props();
</script>

<Sidebar collapsible="icon">
  <SidebarHeader>
    <Header />
  </SidebarHeader>

  <SidebarContent>
    <Navbar />
  </SidebarContent>

  <SidebarFooter>
    <Footer {user} />
  </SidebarFooter>
</Sidebar>
