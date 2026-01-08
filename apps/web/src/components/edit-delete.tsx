import { PencilLine, Trash2 } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { deleteBlog } from "@/server/blog/blog.controller";
import { useAlertDialog } from "./providers/alert-provider";
import { Button } from "./ui/button";

export const EditDelete = ({
  blogId,
  isMobile = false,
}: {
  blogId: string;
  isMobile?: boolean;
}) => {
  const router = useRouter();
  const { show } = useAlertDialog();

  const handleDeleteBlog = async () => {
    const toastId = toast.loading("Deleting...");

    try {
      await deleteBlog({ data: { blogId } });

      router.navigate({ to: "/", replace: true });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className={cn(isMobile ? "block lg:hidden" : "hidden lg:block", "space-x-4 mt-2")}>
      <Button
        onClick={() => {
          show({
            title: "Edit this blog?",
            description: `ID: ${blogId}`,
            actionLabel: "Edit",
            onConfirm: () =>
              router.navigate({ to: "/edit-blog/$blogid", params: { blogid: blogId } }),
          });
        }}
      >
        <HugeiconsIcon icon={PencilLine} /> Edit
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          show({
            title: "Delete this blog?",
            actionLabel: "Delete",
            onConfirm: handleDeleteBlog,
          })
        }
      >
        <HugeiconsIcon icon={Trash2} />
      </Button>
    </div>
  );
};
