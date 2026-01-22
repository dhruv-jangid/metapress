import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export const Logout = () => {
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await authClient.signOut({}, { throw: true });

      navigate({ to: "/sign-in" });
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
