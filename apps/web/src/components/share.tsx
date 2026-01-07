import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy } from "@hugeicons/core-free-icons";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export const Share = ({ username, blogId }: { username: string; blogId: string }) => {
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${username}/${blogId}`);

      toast.success("Link copied to clipboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="space-y-4 mb-16">
      <Separator />

      <div className="flex justify-between">
        <div className="text-muted-foreground tracking-tight">Share this blog</div>

        <div>
          <Button size="sm" onClick={copyLink}>
            <HugeiconsIcon icon={Copy} /> Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
};
