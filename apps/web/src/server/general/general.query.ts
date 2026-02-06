import { queryOptions } from "@tanstack/react-query";
import { getBlogsFeed } from "./general.controller";

export const blogsFeedQueryOptions = () =>
  queryOptions({
    queryKey: ["blogsFeed"],
    queryFn: () => getBlogsFeed(),
    placeholderData: (prevData) => prevData,
  });
