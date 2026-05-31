<script lang="ts">
  import { page } from "$app/state";

  import SignInForm from "../_components/sign-in-form.svelte";

  const passwordChanged = page.url.searchParams.get("passwordChanged") === "true";
</script>

<svelte:head>
  <title>Sign In</title>
</svelte:head>

<div class="flex h-dvh max-h-dvh w-full bg-[url('/images/flowers.jpg')] bg-cover bg-center">
  <div
    class="inset-0 flex w-full flex-col items-center justify-center bg-black/40 backdrop-blur-xs"
  >
    {#if passwordChanged}
      <div class="mb-8">
        <p class="bg-accent text-muted-foreground rounded-2xl border px-3.5 py-1 tracking-tight">
          PASSWORD CHANGED SUCCESSFULLY!
        </p>
      </div>
    {/if}
    <SignInForm />
  </div>
</div>
