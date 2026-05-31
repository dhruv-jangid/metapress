import type {
  CreateBlogInput,
  DeleteBlogInput,
  LikeUnlikeBlogInput,
  UpdateBlogInput,
} from "@metapress/api/schemas/blog";

export type CreateBlogData = CreateBlogInput & {
  userId: string;
  authorName: string;
  authorUsername: string;
  authorImage: string | undefined;
};

export type UpdateBlogData = UpdateBlogInput & {
  userId: string;
  role: string;
};

export type DeleteBlogData = DeleteBlogInput & {
  userId: string;
  role: string;
};

export type LikeUnlikeBlogData = LikeUnlikeBlogInput & { userId: string };
