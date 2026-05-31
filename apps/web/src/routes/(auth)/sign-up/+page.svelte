<script lang="ts">
  import SignUpForm from "../_components/sign-up-form.svelte";
</script>

<svelte:head>
  <title>Sign Up</title>
</svelte:head>

<div class="flex h-dvh max-h-dvh w-full bg-[url('/images/flowers.jpg')] bg-cover bg-center">
  <div
    class="inset-0 flex w-full flex-col items-center justify-center bg-black/40 backdrop-blur-xs"
  >
    <SignUpForm />
  </div>
</div>
