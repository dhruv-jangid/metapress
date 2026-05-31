import type { ContractRouterClient } from "@orpc/contract";

import {
  createBlog,
  deleteBlog,
  getBlog,
  getFeed,
  likeBlog,
  unLikeBlog,
  updateBlog,
} from "./procedures/blog";
import { createComment, deleteComment, getComments } from "./procedures/comment";
import { deleteManyMedia, getMediaSignature } from "./procedures/media";
import {
  contactUser,
  getUserLikedBlogs,
  getUserWithBlogs,
  subscribeToNewsletter,
} from "./procedures/user";

export const router = {
  blog: {
    getFeed: getFeed,
    get: getBlog,
    create: createBlog,
    update: updateBlog,
    delete: deleteBlog,
    like: likeBlog,
    unLike: unLikeBlog,
  },
  comment: {
    getMany: getComments,
    create: createComment,
    delete: deleteComment,
  },
  media: {
    getSignature: getMediaSignature,
    deleteMany: deleteManyMedia,
  },
  user: {
    contact: contactUser,
    subscribeToNewsletter: subscribeToNewsletter,
    getWithBlogs: getUserWithBlogs,
    getLikedBlogs: getUserLikedBlogs,
  },
};

export type Router = typeof router;
export type RouterClient = ContractRouterClient<Router>;
