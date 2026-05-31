<script lang="ts">
  import ForgetPasswordForm from "../_components/forget-pass-form.svelte";
</script>

<svelte:head>
  <title>Forget Password</title>
</svelte:head>

<div
  class="m-4 flex min-h-[96dvh] flex-col gap-16 p-8 pt-24 xl:m-8 xl:min-h-[94dvh] xl:flex-row xl:pt-32 2xl:gap-24"
>
  <div class="space-y-4">
    <div class="text-primary text-sm">FORGET PASSWORD</div>
    <div class="w-xs text-3xl tracking-tighter lg:w-sm lg:text-4xl xl:w-md xl:text-5xl">
      Verify your identity to recover your account. Just a moment, this won&apos;t take much.
    </div>
  </div>
  <div class="xl:w-md">
    <ForgetPasswordForm />
  </div>
</div>
