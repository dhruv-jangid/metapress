import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

export const Logout = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      await authClient.signOut({}, { throw: true });

      router.navigate({ to: "/sign-in" });
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Button variant="destructive" className="w-fit" onClick={() => signOut()}>
      Logout
    </Button>
  );
};
