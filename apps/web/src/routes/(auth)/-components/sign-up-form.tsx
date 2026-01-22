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
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { getFirstZodError } from "@/lib/utils";
import { signupSchema } from "@/shared/auth/auth.schema";

export const SignupForm = () => {
  const [loading, setLoading] = useState({
    form: false,
    google: false,
    github: false,
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const disabled = Object.values(loading).some(Boolean);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, form: true }));

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const username = form.get("username") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      signupSchema.parse({ name, username, email, password });

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

      toast.success("Check your email for verification", { dismissible: false });
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
      setLoading((prev) => ({ ...prev, form: false }));
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setLoading((prev) => ({ ...prev, [provider]: true }));

    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      "",
      "OAuth",
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
          navigate({ to: "/browse", replace: true });
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
      popup.close();
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
            Create an account <HugeiconsIcon icon={PartyPopper} />
          </FieldLegend>
          <FieldDescription className="text-base tracking-tight text-primary">
            Start your journey
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  maxLength={50}
                  disabled={disabled}
                  required
                />
                <InputGroupAddon>
                  <HugeiconsIcon icon={UserIcon} />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter an unique username"
                  maxLength={30}
                  disabled={disabled}
                  required
                />
                <InputGroupAddon>
                  <HugeiconsIcon icon={AtIcon} />
                </InputGroupAddon>
              </InputGroup>
            </Field>
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
            <Field orientation="horizontal" className="justify-between">
              <Button variant="outline" type="submit" disabled={disabled} className="px-4!">
                {loading.form ? (
                  <Spinner />
                ) : (
                  <>
                    <HugeiconsIcon icon={Login01Icon} /> Create
                  </>
                )}
              </Button>
              <div className="flex flex-col items-end gap-0.5 mr-1 mt-0.5">
                <span className="opacity-70 leading-none text-sm tracking-tight">
                  Already have an account?
                </span>
                <Link
                  to="/sign-in"
                  className="border-b border-dashed border-foreground/70 w-max tracking-tight leading-tight inline-flex items-center gap-0.5"
                  replace
                >
                  Login
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
