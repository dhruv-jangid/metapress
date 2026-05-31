<script lang="ts">
  import Footer from "$lib/components/footer.svelte";

  const { children } = $props();
</script>

{@render children()}
<Footer />
