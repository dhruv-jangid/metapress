<script lang="ts">
  import Logout from "./_components/logout.svelte";

  const { data } = $props();
</script>

<div class="min-h-dvh pt-24">
  <div
    class="w-full border-b border-dashed px-12 pb-8 text-end text-5xl font-medium tracking-tight lg:px-64"
  >
    Profile
  </div>

  <div class="mx-12 mt-36 space-y-12 text-xl lg:mx-24">
    <div class="tracking-tight">Username: {data.user.username}</div>
    <div class="tracking-tight">Name: {data.user.name}</div>
    <div class="space-y-2">
      <div class="tracking-tight">Logout from current device</div>
      <Logout />
    </div>
  </div>
</div>
