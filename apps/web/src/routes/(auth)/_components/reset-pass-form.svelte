<script lang="ts">
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client";
  import { Button } from "$lib/components/ui/button";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "$lib/components/ui/input-group";
  import { Spinner } from "$lib/components/ui/spinner";
  import { getFirstZodError } from "$lib/utils";
  import { Eye, EyeOff, ResetPasswordIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ResetPasswordSchema } from "@metapress/api/schemas/auth";
  import { toast } from "svelte-sonner";
  import { ZodError } from "zod";

  let { token }: { token: string } = $props();
  let showPassword = $state(false);
  let loading = $state(false);

  const handleFormSubmit = async (e: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    loading = true;

    const form = new FormData(e.currentTarget);
    const newPassword = form.get("newpassword") as string;

    try {
      ResetPasswordSchema.parse({ newPassword });

      const { error } = await authClient.resetPassword({ newPassword, token });
      if (error) {
        throw new Error(error.message);
      }

      toast.success("Password changed");
      goto("/sign-in?passwordChanged=true", { replaceState: true });
    } catch (error) {
      if (error instanceof ZodError) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        toast.error(getFirstZodError(error));
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      loading = false;
    }
  };
</script>

<form onsubmit={handleFormSubmit} class="space-y-4">
  <Field>
    <FieldLabel for="newpassword" class="lg:text-base">NEW PASSWORD</FieldLabel>
    <InputGroup class="h-24 rounded-none border-b bg-transparent shadow-none md:px-2">
      <InputGroupInput
        type={showPassword ? "text" : "password"}
        id="newpassword"
        name="newpassword"
        placeholder="Enter new password"
        disabled={loading}
        required
        class="text-lg md:text-lg xl:text-2xl"
      />
      <InputGroupAddon
        align="inline-end"
        class="cursor-pointer"
        onclick={() => (showPassword = !showPassword)}
      >
        {#if showPassword}
          <HugeiconsIcon icon={Eye} class="size-7" />
        {:else}
          <HugeiconsIcon icon={EyeOff} class="size-7" />
        {/if}
      </InputGroupAddon>
    </InputGroup>
  </Field>
  <div class="flex items-center justify-end">
    <Button size="lg" type="submit" class="h-12 text-lg lg:text-xl xl:w-36" disabled={loading}>
      {#if loading}
        <Spinner />
      {:else}
        <HugeiconsIcon icon={ResetPasswordIcon} class="mr-0.5 size-5" /> Change
      {/if}
    </Button>
  </div>
</form>
