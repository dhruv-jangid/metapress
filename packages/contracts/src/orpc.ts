import type { ContractRouterClient } from "@orpc/contract";

import {
  createBlog,
  deleteBlog,
  getBlog,
  getFeed,
  likeBlog,
  unLikeBlog,
  updateBlog,
} from "./modules/blogs/procedure";
import { createComment, deleteComment, getComments } from "./modules/comments/procedure";
import { deleteManyMedia, getMediaSignature } from "./modules/media/procedure";
import {
  contactUser,
  getUserLikedBlogs,
  getUserWithBlogs,
  subscribeToNewsletter,
} from "./modules/users/procedure";

export const router = {
  blogs: {
    getFeed: getFeed,
    get: getBlog,
    create: createBlog,
    update: updateBlog,
    delete: deleteBlog,
    like: likeBlog,
    unLike: unLikeBlog,
  },
  comments: {
    getMany: getComments,
    create: createComment,
    delete: deleteComment,
  },
  media: {
    getSignature: getMediaSignature,
    deleteMany: deleteManyMedia,
  },
  users: {
    contact: contactUser,
    subscribeToNewsletter: subscribeToNewsletter,
    getWithBlogs: getUserWithBlogs,
    getLikedBlogs: getUserLikedBlogs,
  },
};

export type Router = typeof router;
export type RouterClient = ContractRouterClient<Router>;
