import {
  ArrowUpRight01Icon,
  Eye,
  EyeOff,
  Github01Icon,
  GoogleIcon,
  LogIn,
  Mail01Icon,
  Rocket01Icon,
  SquareLock01Icon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useRouter } from "@tanstack/react-router";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { signInSchema } from "@/shared/auth/auth.schema";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export const SigninForm = () => {
  const [loading, setLoading] = useState({
    form: false,
    google: false,
    github: false,
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const disabled = Object.values(loading).some(Boolean);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, form: true }));

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const rememberMe = form.get("rememberme") === "on";

    try {
      signInSchema.parse({ email, password, rememberMe });

      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });
      if (error) {
        throw new Error(error.message);
      }

      router.navigate({ to: "/browse", reloadDocument: true, replace: true });
    } catch (error) {
      if (error instanceof ZodError) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        toast.error("Invalid email or password");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading((prev) => ({ ...prev, form: false }));
    }
  };

  const handleOAuth = async (provider: OAuth) => {
    setLoading((prev) => ({ ...prev, [provider]: true }));

    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      "",
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`,
    );
    if (!popup) {
      toast.error("Popup blocked. Please allow popups for this site.");
      setLoading((prev) => ({ ...prev, [provider]: false }));
      return;
    }

    try {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL: "/callback/oauth",
        disableRedirect: true,
      });
      if (error || !data.url) {
        throw new Error(error?.message ?? "Something went wrong");
      }

      popup.location.href = data.url;

      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) {
          return;
        }

        if (event.data.type === "oauth-success") {
          window.removeEventListener("message", handleMessage);
          popup.close();
          setLoading((prev) => ({ ...prev, [provider]: false }));
          router.navigate({ to: "/browse", replace: true });
        } else if (event.data.type === "oauth-error") {
          window.removeEventListener("message", handleMessage);
          popup.close();
          toast.error(event.data.message || "Authentication failed");
          setLoading((prev) => ({ ...prev, [provider]: false }));
        }
      };
      window.addEventListener("message", handleMessage);

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener("message", handleMessage);
          setLoading((prev) => ({ ...prev, [provider]: false }));
        }
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      setLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <FieldGroup className="w-sm sm:w-md md:w-lg">
      <form onSubmit={handleFormSubmit}>
        <FieldSet>
          <FieldLegend className="text-2xl! tracking-tight inline-flex items-center gap-2">
            Login to MetaPress <HugeiconsIcon icon={Rocket01Icon} size={24} />
          </FieldLegend>
          <FieldDescription className="text-base tracking-tight text-primary">
            Express your creativity
          </FieldDescription>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  maxLength={255}
                  disabled={disabled}
                  required
                />
                <InputGroupAddon>
                  <HugeiconsIcon icon={Mail01Icon} />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="password" className="justify-between items-start pr-1">
                Password
                <Link
                  to="/forget-password"
                  className="underline underline-offset-2 decoration-dashed opacity-80 tracking-tight"
                >
                  Forget password?
                </Link>
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter a strong password"
                  maxLength={255}
                  disabled={disabled}
                  required
                />
                <InputGroupAddon>
                  <HugeiconsIcon icon={SquareLock01Icon} />
                </InputGroupAddon>
                <InputGroupAddon
                  align="inline-end"
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HugeiconsIcon icon={Eye} /> : <HugeiconsIcon icon={EyeOff} />}
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
          <FieldGroup className="gap-3">
            <Field orientation="horizontal" className="ml-0.5 opacity-80">
              <Checkbox id="rememberme" name="rememberme" disabled={disabled} defaultChecked />
              <label htmlFor="rememberme" className="leading-tight text-sm mt-[0.1rem]">
                Remember me
              </label>
            </Field>
            <Field orientation="horizontal" className="justify-between">
              <Button variant="outline" type="submit" disabled={disabled} className="px-4!">
                {loading.form ? (
                  <Spinner />
                ) : (
                  <>
                    <HugeiconsIcon icon={LogIn} className="-ml-0.5" /> Sign in
                  </>
                )}
              </Button>
              <div className="flex flex-col items-end gap-0.5 mr-1 mt-0.5">
                <span className="opacity-70 leading-none text-sm tracking-tight">
                  Don&apos;t have an account?
                </span>
                <Link
                  to="/sign-up"
                  className="border-b border-dashed border-foreground/70 w-max tracking-tight leading-tight inline-flex items-center gap-0.5"
                  replace
                >
                  Create
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
                </Link>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      <FieldSeparator className="w-[98%] mx-auto">or</FieldSeparator>

      <FieldSet>
        <div className="flex gap-4 justify-center w-full">
          <Button
            variant="outline"
            disabled={disabled}
            onClick={() => handleOAuth("google")}
            className="w-[48%]"
          >
            {loading.google ? (
              <Spinner />
            ) : (
              <>
                <HugeiconsIcon icon={GoogleIcon} />
                Google
              </>
            )}
          </Button>
          <Button
            variant="outline"
            disabled={disabled}
            onClick={() => handleOAuth("github")}
            className="w-[48%]"
          >
            {loading.github ? (
              <Spinner />
            ) : (
              <>
                <HugeiconsIcon icon={Github01Icon} />
                Github
              </>
            )}
          </Button>
        </div>
      </FieldSet>
    </FieldGroup>
  );
};
