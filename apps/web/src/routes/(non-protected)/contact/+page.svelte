<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "$lib/components/ui/input-group";
  import { Spinner } from "$lib/components/ui/spinner";
  import { orpc } from "$lib/orpc";
  import { getFirstZodError } from "$lib/utils";
  import { Mail01Icon, SentIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ContactUserSchema } from "@metapress/contracts/users";
  import { createMutation } from "@tanstack/svelte-query";
  import { toast } from "svelte-sonner";
  import { ZodError } from "zod";

  let loading = $state(false);

  const contactUserMutation = createMutation(() => orpc.user.contact.mutationOptions());

  const handleFormSubmit = async (e: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    loading = true;

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;

    try {
      ContactUserSchema.parse({ email });

      await contactUserMutation.mutateAsync({ email });

      toast.success("We will contact you back shortly.");
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

<svelte:head>
  <title>Contact</title>
</svelte:head>

<div
  class="m-4 flex min-h-[96dvh] flex-col gap-16 p-8 pt-24 xl:m-8 xl:min-h-[94dvh] xl:flex-row xl:pt-32 2xl:gap-24"
>
  <div class="space-y-4">
    <div class="text-primary text-sm">TALK TO US</div>
    <div class="w-xs text-3xl tracking-tighter lg:w-sm lg:text-4xl xl:w-md xl:text-5xl">
      What&apos;s an email we can reach you out?
    </div>
  </div>

  <form onsubmit={handleFormSubmit} class="space-y-4 xl:w-md">
    <Field>
      <FieldLabel for="email" class="lg:text-base">EMAIL ADDRESS</FieldLabel>
      <InputGroup class="h-24 rounded-none border-0 border-b bg-transparent shadow-none md:px-2">
        <InputGroupInput
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
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
          <HugeiconsIcon icon={SentIcon} class="mr-0.5 size-5" /> Submit
        {/if}
      </Button>
    </div>
  </form>
</div>
