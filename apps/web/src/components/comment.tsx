import { toast } from "sonner";
import { ZodError } from "zod";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { MessageSquareText, Trash2 } from "@hugeicons/core-free-icons";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAlertDialog } from "./providers/alert-provider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getFirstZodError } from "@/lib/utils";
import { createComment, deleteComment } from "@/server/comment/comment.controller";

export const Comment = ({
  blogId,
  comments,
  isAuthor,
  username,
}: {
  blogId: string;
  comments: Array<BlogComment>;
  isAuthor: boolean;
  username: string;
}) => {
  const { show } = useAlertDialog();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentsList, setCommentsList] = useState(comments);

  const handleAddComment = async () => {
    setLoading(true);
    try {
      const newComment = await createComment({ data: { blogId, content: comment } });
      setComment("");
      setCommentsList((prev) => [...prev, newComment]);
    } catch (error) {
      if (error instanceof ZodError) {
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

  const handleDeleteComment = async (blogIdX: string, commentX: BlogComment) => {
    try {
      await deleteComment({ data: { commentId: commentX.id, blogId: blogIdX } });
      setCommentsList((prev) => prev.filter((c) => c.id !== commentX.id));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="w-4/5 space-y-6 tracking-tight text-balance">
      <div className="relative flex flex-col gap-2">
        <Textarea
          name="comment"
          id="comment"
          placeholder="Add a comment..."
          className="resize-none min-h-32"
          maxLength={100}
          disabled={loading}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <span className="absolute bottom-12 right-4 text-xs tracking-tight text-muted-foreground">
          {comment.length}/100
        </span>
        <div className="flex justify-end gap-2.5 sm:gap-4">
          <Button size="sm" onClick={handleAddComment} disabled={loading || !comment.trim()}>
            {loading ? (
              "..."
            ) : (
              <>
                Comment <HugeiconsIcon icon={MessageSquareText} />
              </>
            )}
          </Button>
        </div>
      </div>

      {commentsList.map((c) => (
        <div
          key={c.id}
          className="flex justify-between p-4 border border-input rounded-xl bg-input/20"
        >
          <div className="flex gap-3">
            <Link
              to="/$username"
              params={{ username: c.authorUsername }}
              className="relative w-8 h-8 rounded-full overflow-hidden"
            >
              <Avatar>
                <AvatarImage src={c.authorImage || undefined} alt={c.authorName} />
                <AvatarFallback>{c.authorName[0].toUpperCase() || "M"}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col gap-0.5">
              <Link
                to="/$username"
                params={{ username: c.authorUsername }}
                className="font-medium line-clamp-1 hover:animate-pulse text-sm w-fit"
              >
                {c.authorName}
              </Link>
              <span className="text-sm text-neutral-400">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }).format(new Date(c.createdAt))}
              </span>
              <p className="mt-4">{c.content}</p>
            </div>
          </div>
          {(isAuthor || c.authorUsername === username) && (
            <HugeiconsIcon
              icon={Trash2}
              size={16}
              className="cursor-pointer stroke-red-600 mt-0.5 mr-0.5"
              onClick={() =>
                show({
                  title: "Delete comment?",
                  description: c.content,
                  actionLabel: "Delete",
                  onConfirm: () => handleDeleteComment(blogId, c),
                })
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};
