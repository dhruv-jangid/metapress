import { queryOptions } from "@tanstack/react-query";
import { getUserLikedBlogs, getUserWithBlogs } from "./user.controller";

export const userWithBlogsQueryOptions = ({ username }: { username: string }) =>
  queryOptions({
    queryKey: ["userWithBlogs", username],
    queryFn: () => getUserWithBlogs({ data: username }),
    placeholderData: (prevData) => prevData,
  });

export const userLikedBlogsQueryOptions = ({ id }: { id: string }) =>
  queryOptions({
    queryKey: ["userLikedBlogs", id],
    queryFn: () => getUserLikedBlogs({ data: id }),
    placeholderData: (prevData) => prevData,
  });
