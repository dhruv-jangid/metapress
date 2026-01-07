import { toast } from "sonner";
import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Heart } from "@hugeicons/core-free-icons";

import { likeBlog, unlikeBlog } from "@/server/blog/blog.controller";

export const Like = ({
  blogId,
  likes,
  isLiked,
}: {
  blogId: string;
  likes: number;
  isLiked: boolean;
}) => {
  const [tempLikes, setTempLikes] = useState(likes);
  const [tempIsLiked, setTempIsLiked] = useState(isLiked);
  const isRequestInFlight = useRef(false);

  const handleLikeUnlike = async () => {
    if (isRequestInFlight.current) {
      return;
    }

    const newLikedState = !tempIsLiked;
    const newLikesCount = newLikedState ? tempLikes + 1 : tempLikes - 1;

    const prevLiked = tempIsLiked;
    const prevLikes = tempLikes;

    setTempIsLiked(newLikedState);
    setTempLikes(newLikesCount);

    isRequestInFlight.current = true;

    try {
      if (newLikedState) {
        await likeBlog({ data: { blogId } });
      } else {
        await unlikeBlog({ data: { blogId } });
      }
    } catch (error) {
      setTempIsLiked(prevLiked);
      setTempLikes(prevLikes);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      isRequestInFlight.current = false;
    }
  };

  return (
    <div className="flex items-center gap-1 antialiased">
      <div onClick={handleLikeUnlike} className="flex items-center gap-1 text-pretty">
        {tempIsLiked ? (
          <HugeiconsIcon
            icon={Heart}
            strokeWidth={1}
            size={32}
            cursor="pointer"
            className="fill-red-600 stroke-red-600"
          />
        ) : (
          <HugeiconsIcon
            icon={Heart}
            strokeWidth={1}
            size={32}
            cursor="pointer"
            className="stroke-muted-foreground/50"
          />
        )}
        <span className="text-lg tracking-tight">{tempLikes}</span>
      </div>
    </div>
  );
};
