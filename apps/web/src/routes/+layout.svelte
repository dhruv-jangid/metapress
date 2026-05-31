<script lang="ts">
  import "./layout.css";
  import AlertDialogProvider from "$lib/components/alert-dialog.svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { ModeWatcher } from "mode-watcher";

  let { children, data } = $props();
</script>

<svelte:head>
  <title>MetaPress</title>
  <link rel="icon" href="/favicon.svg" />
</svelte:head>

<QueryClientProvider client={data.queryClient}>
  <ModeWatcher defaultMode="dark" />
  <Toaster />
  <AlertDialogProvider />
  {@render children()}
</QueryClientProvider>
