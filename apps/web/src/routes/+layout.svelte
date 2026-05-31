<script lang="ts">
  import "./layout.css";
  import AlertDialogProvider from "$lib/components/alert-dialog.svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import { ModeWatcher } from "mode-watcher";

  let { children } = $props();
</script>

<svelte:head>
  <title>MetaPress</title>
  <link rel="icon" href="/favicon.svg" />
</svelte:head>

<ModeWatcher defaultMode="dark" />
<Toaster />
<AlertDialogProvider />
{@render children()}
