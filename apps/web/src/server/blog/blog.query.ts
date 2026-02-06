import { queryOptions } from "@tanstack/react-query";
import { getBlog } from "./blog.controller";

export const blogQueryOptions = ({ id }: { id: string }) =>
  queryOptions({
    queryKey: ["blog", id],
    queryFn: () => getBlog({ data: id }),
    placeholderData: (prevData) => prevData,
  });
