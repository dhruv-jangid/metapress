import { Trash2 } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useAlertDialog } from "./providers/alert-provider";
import { Button } from "./ui/button";

export const DeleteUser = ({ userId }: { userId: string }) => {
  const { show } = useAlertDialog();
  const [loading, setLoading] = useState(false);

  const deleteUserAdmin = async () => {
    setLoading(true);
    const toastId = toast.loading("Deleting...");
    try {
      const { error } = await authClient.admin.removeUser({ userId });
      if (error) {
        throw new Error(error.message);
      }

      toast.success(`Deleted user with id: ${userId}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      disabled={loading}
      onClick={() =>
        show({
          title: "Delete user?",
          description: `ID: ${userId}`,
          actionLabel: "Delete",
          onConfirm: deleteUserAdmin,
        })
      }
    >
      <HugeiconsIcon icon={Trash2} size={18} />
    </Button>
  );
};
