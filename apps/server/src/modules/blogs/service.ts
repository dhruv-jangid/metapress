import type {
  Blog,
  CreateBlogInput,
  LikeUnlikeBlogInput,
  UpdateBlogInput,
} from "@metapress/contracts/blogs";
import { BlogRepository } from "@metapress/db/blogs";
import { isUniqueViolation } from "@metapress/db/utils";
import { ORPCError } from "@orpc/server";

import type { UserSession } from "@/lib/auth";
import { decodeId, encodeId } from "@/lib/hash-id";

import {
  blogCK,
  blogCommentsCK,
  blogCommentsMetaCK,
  blogLikesCK,
  blogLikesCountCK,
  feedBlogsCK,
  userBlogsCK,
  userBlogsMetaCK,
  userLikedCK,
  userLikedMetaCK,
} from "../cache/keys";
import { CacheService } from "../cache/service";
import {
  BLOG_TTL,
  COMMENTS_TTL,
  FEED_TTL,
  USER_BLOGS_TTL,
  USER_LIKED_BLOGS_TTL,
} from "../cache/ttls";
import { MediaService } from "../media/service";

export abstract class BlogService {
  static async find(id: string, userId: string) {
    const blogId = decodeId(id);
    if (!blogId) {
      throw new ORPCError("NOT_FOUND");
    }

    const blogKey = blogCK(blogId);
    try {
      const cached = await CacheService.get(blogKey);
      if (cached) {
        const blog = JSON.parse(cached as string) as Blog;

        const { likes, isLiked } = await this.getLikes(blog.id, userId);

        return { ...blog, id, likes, isLiked };
      }
    } catch {}

    let blog: Blog | null;
    try {
      blog = await BlogRepository.find(blogId);
    } catch (error) {
      throw new ORPCError("FETCH_FAILED", error as Error);
    }
    if (!blog) {
      throw new ORPCError("NOT_FOUND");
    }

    try {
      void CacheService.set(blogKey, JSON.stringify(blog), BLOG_TTL);
    } catch {}

    const { likes, isLiked } = await this.getLikes(blog.id, userId);

    return { ...blog, id, likes, isLiked };
  }

  private static async getLikes(blogId: string, userId: string) {
    try {
      const likesCountKey = blogLikesCountCK(blogId);
      const likesKey = blogLikesCK(blogId);

      const pipeline = CacheService.pipeline();
      pipeline.get(likesCountKey);
      pipeline.sIsMember(likesKey, userId);

      const [likesRaw, isLikedRaw] = await pipeline.execAsPipeline();

      return { likes: Number(likesRaw), isLiked: Boolean(isLikedRaw) };
    } catch {
      return { likes: 0, isLiked: false };
    }
  }

  static async create(data: CreateBlogInput, user: UserSession) {
    let blog: Blog | null = null;
    try {
      blog = await BlogRepository.create({
        ...data,
        authorName: user.name,
        authorUsername: user.username,
        authorImage: user.image ?? undefined,
        userId: user.id,
      });
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new ORPCError("ALREADY_EXISTS", error as Error);
      }
      throw new ORPCError("CREATE_FAILED", error as Error);
    }

    try {
      const finalBlog = { ...blog, likes: 0, isLiked: false };

      const blogKey = blogCK(blog.id);
      const userBlogsKey = userBlogsCK(user.id);
      const userBlogsMetaKey = userBlogsMetaCK(user.id);
      const commentsMetaKey = blogCommentsMetaCK(blog.id);

      const transaction = CacheService.pipeline();
      transaction.set(blogKey, JSON.stringify(finalBlog), {
        expiration: { type: "EX", value: BLOG_TTL },
      });
      transaction.set(userBlogsMetaKey, "ok", {
        expiration: { type: "EX", value: USER_BLOGS_TTL },
      });
      transaction.zAdd(userBlogsKey, {
        score: new Date(blog.createdAt).getTime(),
        value: blog.id,
      });
      transaction.set(commentsMetaKey, "empty", {
        expiration: { type: "EX", value: COMMENTS_TTL },
      });

      await transaction.exec();
    } catch {}

    return encodeId(blog.id);
  }

  static async update(data: UpdateBlogInput, user: UserSession) {
    const blogId = decodeId(data.blogId);
    if (!blogId) {
      throw new ORPCError("NOT_FOUND");
    }

    let blog: Blog | null = null;
    try {
      blog = await BlogRepository.update({
        ...data,
        blogId,
        role: user.role,
        userId: user.id,
      });
    } catch (error) {
      throw new ORPCError("UPDATE_FAILED", error as Error);
    }

    const { likes, isLiked } = await this.getLikes(blog.id, user.id);

    try {
      const finalBlog = { ...blog, likes, isLiked };

      const blogKey = blogCK(blogId);
      await CacheService.set(blogKey, JSON.stringify(finalBlog), BLOG_TTL);

      if (data.imagesToDelete.length > 0) {
        MediaService.deleteMany({ publicIds: data.imagesToDelete });
      }
    } catch {}
  }

  static async delete(id: string, user: UserSession) {
    const blogId = decodeId(id);
    if (!blogId) {
      throw new ORPCError("NOT_FOUND");
    }

    let images: string[] = [];
    try {
      images = await BlogRepository.delete({
        blogId,
        role: user.role,
        userId: user.id,
      });
    } catch (error) {
      throw new ORPCError("DELETE_FAILED", error as Error);
    }

    try {
      MediaService.deleteMany({ publicIds: images });

      const blogKey = blogCK(blogId);
      const likesCountKey = blogLikesCountCK(blogId);
      const likesKey = blogLikesCK(blogId);
      const commentsMetaKey = blogCommentsMetaCK(blogId);
      const commentsKey = blogCommentsCK(blogId);
      const userBlogsKey = userBlogsCK(user.id);
      const userLikedKey = userLikedCK(user.id);

      const transaction = CacheService.pipeline();
      transaction.del([blogKey, likesCountKey, likesKey, commentsMetaKey, commentsKey]);
      transaction.zRem(userBlogsKey, blogId);
      transaction.zRem(userLikedKey, blogId);

      await transaction.exec();
    } catch {}
  }

  static async like(data: LikeUnlikeBlogInput, user: UserSession) {
    const blogId = decodeId(data.blogId);
    if (!blogId) {
      throw new ORPCError("NOT_FOUND");
    }

    const likeScript = `
    local count_key = KEYS[1]
    local set_key = KEYS[2]
    local meta_key = KEYS[3]
    local sorted_key = KEYS[4]
    local user_id = ARGV[1]
    local blog_id = ARGV[2]
    local timestamp = ARGV[3]
    local ttl = tonumber(ARGV[4])

    local already_liked = redis.call('SISMEMBER', set_key, user_id)

    if already_liked == 0 then
      redis.call('INCR', count_key)
      redis.call('SADD', set_key, user_id)
      redis.call('SET', meta_key, 'ok', 'EX', ttl)
      redis.call('ZADD', sorted_key, timestamp, blog_id)
      redis.call('EXPIRE', sorted_key, ttl)
      return 1
    else
      return 0
    end
  `;

    try {
      await CacheService.eval(likeScript, {
        keys: [
          blogLikesCountCK(blogId),
          blogLikesCK(blogId),
          userLikedMetaCK(user.id),
          userLikedCK(user.id),
        ],
        arguments: [user.id, blogId, Date.now().toString(), USER_LIKED_BLOGS_TTL.toString()],
      });
    } catch {}
  }

  static async unLike(data: LikeUnlikeBlogInput, user: UserSession) {
    const blogId = decodeId(data.blogId);
    if (!blogId) {
      throw new ORPCError("NOT_FOUND");
    }

    const unlikeScript = `
    local count_key = KEYS[1]
    local set_key = KEYS[2]
    local sorted_key = KEYS[3]
    local user_id = ARGV[1]
    local blog_id = ARGV[2]

    local was_member = redis.call('SREM', set_key, user_id)

    if was_member == 1 then
      local count = redis.call('GET', count_key)

      if count and tonumber(count) > 0 then
        redis.call('DECR', count_key)
      end

      redis.call('ZREM', sorted_key, blog_id)
      return 1
    else
      return 0
    end
  `;

    try {
      await CacheService.eval(unlikeScript, {
        keys: [blogLikesCountCK(blogId), blogLikesCK(blogId), userLikedCK(user.id)],
        arguments: [user.id, blogId],
      });
    } catch {}
  }

  static async getFeed(limit = 20) {
    const blogsFeedKey = feedBlogsCK;
    try {
      const blogIds = (await CacheService.sRandMembers(blogsFeedKey, limit)) as string[];

      if (blogIds.length > 0) {
        const cached = await CacheService.mGet<Blog>(blogIds.map((id) => blogCK(id)));

        const cachedBlogs = cached.filter((b): b is Blog => b !== null);
        if (cachedBlogs.length === blogIds.length) {
          const blogs = cachedBlogs.map((blog) => ({
            ...blog,
            id: encodeId(blog.id),
          }));

          return blogs;
        }

        const missingBlogsIds = blogIds.filter((_, i) => cached[i] === null);

        const dbBlogs = await BlogRepository.findMany(missingBlogsIds);

        if (dbBlogs.length > 0) {
          const transaction = CacheService.pipeline();
          dbBlogs.forEach((blog) => {
            const blogKey = blogCK(blog.id);
            transaction.set(blogKey, JSON.stringify(blog), {
              expiration: { type: "EX", value: BLOG_TTL },
            });
          });

          await transaction.exec();
        }

        const blogsMap = new Map([...cachedBlogs, ...dbBlogs].map((b) => [b.id, b]));
        const orderedBlogs = blogIds.reduce<Blog[]>((acc, blogId) => {
          const blog = blogsMap.get(blogId);
          if (blog) {
            acc.push(blog);
          }
          return acc;
        }, []);
        const blogs = orderedBlogs.map((blog) => ({
          ...blog,
          id: encodeId(blog.id),
        }));

        return blogs;
      }
    } catch {}

    let dbBlogs;
    try {
      dbBlogs = await BlogRepository.findManyRandom(limit);
    } catch (error) {
      throw new ORPCError("FETCH_FAILED", error as Error);
    }
    if (!dbBlogs.length) {
      throw new ORPCError("NOT_FOUND");
    }

    try {
      const transaction = CacheService.pipeline();
      dbBlogs.forEach((blog) => {
        const blogKey = blogCK(blog.id);
        transaction.set(blogKey, JSON.stringify(blog), {
          expiration: { type: "EX", value: BLOG_TTL },
        });
      });

      const blogIds = dbBlogs.map((blog) => blog.id);
      transaction.sAdd(blogsFeedKey, blogIds);
      transaction.expire(blogsFeedKey, FEED_TTL);

      await transaction.exec();
    } catch {}

    const blogs = dbBlogs.map((blog) => ({
      ...blog,
      id: encodeId(blog.id),
    }));

    return blogs;
  }
}
