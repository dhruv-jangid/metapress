import { toast } from "sonner";
import { ZodError } from "zod";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { notFound, useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, ResetPasswordIcon } from "@hugeicons/core-free-icons";

import { authClient } from "@/lib/auth-client";
import { getFirstZodError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldLabel } from "@/components/ui/field";
import { resetPasswordSchema } from "@/shared/auth/auth.schema";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!token) {
    notFound();
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const newPassword = form.get("newpassword") as string;

    try {
      resetPasswordSchema.parse({ newPassword });

      const { error } = await authClient.resetPassword({ newPassword, token });
      if (error) {
        throw new Error(error.message);
      }

      localStorage.setItem("reset-password-complete", "true");

      toast.success("Password changed");
      router.navigate({ to: "/sign-in", search: { passwordChanged: true }, replace: true });
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
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="newpassword" className="lg:text-base">
          NEW PASSWORD
        </FieldLabel>
        <InputGroup className="border-0 shadow-none h-24 md:px-2 border-b rounded-none bg-transparent!">
          <InputGroupInput
            type={showPassword ? "text" : "password"}
            id="newpassword"
            name="newpassword"
            placeholder="Enter new password"
            maxLength={255}
            disabled={loading}
            required
            className="text-lg md:text-lg xl:text-2xl"
          />
          <InputGroupAddon
            align="inline-end"
            className="cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <HugeiconsIcon icon={Eye} className="size-7" />
            ) : (
              <HugeiconsIcon icon={EyeOff} className="size-7" />
            )}
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <div className="flex items-center justify-end">
        <Button
          size="lg"
          type="submit"
          className="text-lg lg:text-xl h-12 xl:w-36"
          disabled={loading}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <HugeiconsIcon icon={ResetPasswordIcon} className="size-5 mr-0.5" /> Change
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
