<script lang="ts">
  import { page } from "$app/state";

  import ResetPasswordForm from "../_components/reset-pass-form.svelte";

  const token = page.url.searchParams.get("token");
  if (!token) {
    throw new Error("Something went wrong");
  }
</script>

<svelte:head>
  <title>Reset Password</title>
</svelte:head>

<div
  class="m-4 flex min-h-[96dvh] flex-col gap-16 p-8 pt-24 xl:m-8 xl:min-h-[94dvh] xl:flex-row xl:pt-32 2xl:gap-24"
>
  <div class="space-y-4">
    <div class="text-primary text-sm">RESET PASSWORD</div>
    <div class="w-xs text-3xl tracking-tighter lg:w-sm lg:text-4xl xl:w-md xl:text-5xl">
      Just a reminder that this action can&apos;t be undone and this link is valid only for 1 hour
    </div>
  </div>
  <div class="xl:w-md">
    <ResetPasswordForm token={token!} />
  </div>
</div>
