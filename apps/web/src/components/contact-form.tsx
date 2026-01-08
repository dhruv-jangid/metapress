import { Mail01Icon, SentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";
import { getFirstZodError } from "@/lib/utils";
import { contactUser } from "@/server/general/general.controller";
import { contactUserSchema } from "@/shared/common/common.schema";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Spinner } from "./ui/spinner";

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;

    try {
      contactUserSchema.parse({ email });

      await contactUser({ data: { email } });

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
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 xl:w-md">
      <Field>
        <FieldLabel htmlFor="email" className="lg:text-base">
          EMAIL ADDRESS
        </FieldLabel>
        <InputGroup className="border-0 shadow-none h-24 md:px-2 border-b rounded-none bg-transparent!">
          <InputGroupInput
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            maxLength={255}
            disabled={loading}
            required
            className="text-lg md:text-lg xl:text-2xl"
          />
          <InputGroupAddon align="inline-end">
            <HugeiconsIcon icon={Mail01Icon} className="size-7" />
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
              <HugeiconsIcon icon={SentIcon} className="size-5 mr-0.5" /> Submit
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
