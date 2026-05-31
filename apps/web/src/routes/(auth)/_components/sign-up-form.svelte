<script lang="ts">
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client";
  import { Button } from "$lib/components/ui/button";
  import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
  } from "$lib/components/ui/field";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "$lib/components/ui/input-group";
  import { Spinner } from "$lib/components/ui/spinner";
  import { getFirstZodError } from "$lib/utils";
  import {
    ArrowUpRight01Icon,
    AtIcon,
    Eye,
    EyeOff,
    Github01Icon,
    GoogleIcon,
    Login01Icon,
    Mail01Icon,
    PartyPopper,
    SquareLock01Icon,
    UserIcon,
  } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { SignupSchema } from "@metapress/api/schemas/auth";
  import { toast } from "svelte-sonner";
  import { ZodError } from "zod";

  let loading = $state({
    form: false,
    google: false,
    github: false,
  });
  let showPassword = $state(false);

  const disabled = $derived(Object.values(loading).some(Boolean));

  const handleFormSubmit = async (e: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    loading.form = true;

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const username = form.get("username") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      SignupSchema.parse({ name, username, email, password });

      const { error } = await authClient.signUp.email({
        name,
        username,
        email,
        password,
      });
      if (error) {
        switch (error.code) {
          case "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER":
            throw new Error("Username is already taken");
          case "USER_ALREADY_EXISTS":
            throw new Error("Email already registered");
          default:
            throw new Error(error.message);
        }
      }

      toast.success("Check your email for verification", {
        dismissible: false,
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
      loading.form = false;
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    loading[provider] = true;

    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    try {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL: `${window.location.origin}/callback/oauth`,
        disableRedirect: true,
      });
      if (error || !data.url) {
        throw new Error(error?.message ?? "Something went wrong");
      }

      const popup = window.open(
        data.url,
        "_blank",
        `width=${width},height=${height},left=${left},top=${top}`,
      );
      if (!popup) {
        toast.error("Popup blocked. Please allow popups for this site.");
        loading[provider] = false;
        return;
      }

      const handleMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) {
          return;
        }

        if (event.data.type === "oauth-success") {
          window.removeEventListener("message", handleMessage);
          popup.close();
          loading[provider] = false;
          await goto("/browse", { replaceState: true, invalidateAll: true });
        } else if (event.data.type === "oauth-error") {
          window.removeEventListener("message", handleMessage);
          popup.close();
          toast.error(event.data.message || "Authentication failed");
          loading[provider] = false;
        }
      };
      window.addEventListener("message", handleMessage);

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener("message", handleMessage);
          loading[provider] = false;
        }
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      loading[provider] = false;
    }
  };
</script>

<FieldGroup class="bg-card ring-foreground/10 w-sm rounded-4xl p-8 sm:w-md md:w-lg">
  <form onsubmit={handleFormSubmit}>
    <FieldSet>
      <FieldLegend class="inline-flex items-center gap-2 text-xl! tracking-tight">
        Create an account <HugeiconsIcon icon={PartyPopper} />
      </FieldLegend>
      <FieldDescription class="text-base tracking-tight">Start your journey</FieldDescription>

      <FieldGroup>
        <Field>
          <FieldLabel for="name">Name</FieldLabel>
          <InputGroup>
            <InputGroupInput
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              {disabled}
              required
            />
            <InputGroupAddon>
              <HugeiconsIcon icon={UserIcon} />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="username">Username</FieldLabel>
          <InputGroup>
            <InputGroupInput
              type="text"
              id="username"
              name="username"
              placeholder="john_doe"
              {disabled}
              required
            />
            <InputGroupAddon>
              <HugeiconsIcon icon={AtIcon} />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="email">Email</FieldLabel>
          <InputGroup>
            <InputGroupInput
              type="email"
              id="email"
              name="email"
              placeholder="me@example.com"
              {disabled}
              required
            />
            <InputGroupAddon>
              <HugeiconsIcon icon={Mail01Icon} />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="password" class="items-start justify-between pr-1">Password</FieldLabel>
          <InputGroup>
            <InputGroupInput
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              {disabled}
              required
            />
            <InputGroupAddon>
              <HugeiconsIcon icon={SquareLock01Icon} />
            </InputGroupAddon>
            <InputGroupAddon
              align="inline-end"
              class="cursor-pointer"
              onclick={() => (showPassword = !showPassword)}
            >
              {#if showPassword}
                <HugeiconsIcon icon={Eye} />
              {:else}
                <HugeiconsIcon icon={EyeOff} />
              {/if}
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
      <FieldGroup class="gap-3">
        <Field orientation="horizontal" class="justify-between">
          <Button type="submit" {disabled} class="px-4">
            {#if loading.form}
              <Spinner />
            {:else}
              <HugeiconsIcon icon={Login01Icon} /> Create
            {/if}
          </Button>
          <div class="mt-0.5 mr-1 flex flex-col items-end gap-0.5">
            <span class="text-sm leading-none tracking-tight opacity-70">
              Already have an account?
            </span>
            <a
              href="/sign-in"
              class="border-foreground/70 inline-flex w-max items-center gap-0.5 border-b border-dashed leading-tight tracking-tight"
              data-sveltekit-replacestate
            >
              Login
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
            </a>
          </div>
        </Field>
      </FieldGroup>
    </FieldSet>
  </form>

  <FieldSeparator class="[&>span]:bg-card mx-auto w-[98%]">or</FieldSeparator>

  <FieldSet>
    <div class="flex w-full justify-center gap-4">
      <Button variant="outline" {disabled} onclick={() => handleOAuth("google")} class="w-[48%]">
        {#if loading.google}
          <Spinner />
        {:else}
          <HugeiconsIcon icon={GoogleIcon} />
          Google
        {/if}
      </Button>
      <Button variant="outline" {disabled} onclick={() => handleOAuth("github")} class="w-[48%]">
        {#if loading.github}
          <Spinner />
        {:else}
          <HugeiconsIcon icon={Github01Icon} />
          Github
        {/if}
      </Button>
    </div>
  </FieldSet>
</FieldGroup>
