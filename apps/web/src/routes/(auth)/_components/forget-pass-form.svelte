<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import { Button } from "$lib/components/ui/button";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "$lib/components/ui/input-group";
  import { Spinner } from "$lib/components/ui/spinner";
  import { getFirstZodError } from "$lib/utils";
  import { Mail01Icon, SentIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ForgetPasswordSchema } from "@metapress/contracts/auth";
  import { toast } from "svelte-sonner";
  import { ZodError } from "zod";

  let loading = $state(false);

  const handleFormSubmit = async (e: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    loading = true;

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;

    try {
      ForgetPasswordSchema.parse({ email });

      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        throw new Error(error.message);
      }

      toast.success("Check your email for password reset link", {
        duration: Infinity,
        dismissible: false,
        description: "Link is valid only for 1 hour",
        descriptionClass: "text-red-500!",
        class: "select-none",
      });
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
    <FieldLabel for="email" class="lg:text-base">REGISTERED EMAIL</FieldLabel>
    <InputGroup class="h-24 rounded-none border-b bg-transparent shadow-none md:px-2">
      <InputGroupInput
        type="email"
        id="email"
        name="email"
        placeholder="Enter your registered email"
        disabled={loading}
        required
        class="text-lg md:text-lg xl:text-2xl"
      />
      <InputGroupAddon align="inline-end">
        <HugeiconsIcon icon={Mail01Icon} class="size-7" />
      </InputGroupAddon>
    </InputGroup>
  </Field>
  <div class="flex items-center justify-end">
    <Button size="lg" type="submit" class="h-12 text-lg lg:text-xl xl:w-36" disabled={loading}>
      {#if loading}
        <Spinner />
      {:else}
        <HugeiconsIcon icon={SentIcon} class="mr-0.5 size-5" /> Verify
      {/if}
    </Button>
  </div>
</form>
