import { queryOptions } from "@tanstack/react-query";
import { getComments } from "./comment.controller";

export const commentsQueryOptions = ({ id }: { id: string }) =>
  queryOptions({
    queryKey: ["comments", id],
    queryFn: () => getComments({ data: id }),
    placeholderData: (prevData) => prevData,
  });
