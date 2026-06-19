import {
  createBlog,
  deleteBlog,
  getBlog,
  getFeed,
  likeBlog,
  unLikeBlog,
  updateBlog,
} from "./modules/blogs/router";
import { createComment, deleteComment, getComments } from "./modules/comments/router";
import { deleteManyMedia, getMediaSignature } from "./modules/media/router";
import {
  contactUser,
  getUserLikedBlogs,
  getUserWithBlogs,
  subscribeToNewsletter,
} from "./modules/users/router";

export const appRouter = {
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
