<script lang="ts">
  import { dev } from "$app/environment";
  import Footer from "$lib/components/footer.svelte";
  import Sidebar from "$lib/components/sidebar/index.svelte";
  import { SidebarProvider, SidebarTrigger } from "$lib/components/ui/sidebar";
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";

  const { children, data } = $props();
</script>

<QueryClientProvider client={data.queryClient}>
  <SidebarProvider>
    <Sidebar user={data.user} />
    <main class="w-full">
      <SidebarTrigger />
      {@render children()}
      <Footer />
    </main>
  </SidebarProvider>
  {#if dev}
    <SvelteQueryDevtools />
  {/if}
</QueryClientProvider>
