import {
  blogCK,
  blogCommentsCK,
  blogCommentsMetaCK,
  blogLikesCK,
  blogLikesCountCK,
  userBlogsCK,
  userBlogsMetaCK,
  userLikedCK,
  userLikedMetaCK,
} from "../cache/cache.key";
import { CacheService } from "../cache/cache.service";
import { ImageService } from "../image/image.service";
import { BLOG_TTL, COMMENTS_TTL, USER_BLOGS_TTL, USER_LIKED_BLOGS_TTL } from "../cache/cache.ttl";
import { BlogError } from "./blog.error";
import { BlogRepository } from "./blog.repository";
import { decodeId, encodeId } from "@/lib/hashids";
import { isUniqueViolation } from "@/shared/errors/unique-violation";

export class BlogService {
  constructor(private readonly user: UserSession) {}

  async find(id: string) {
    const blogId = decodeId(id);
    if (!blogId) {
      throw new BlogError("NOT_FOUND", "Invalid ID");
    }

    const blogKey = blogCK(blogId);
    try {
      const cached = await CacheService.get(blogKey);
      if (cached) {
        const blog = JSON.parse(cached) as Blog;

        const { likes, isLiked } = await this.getLikes(blog.id);

        return { ...blog, id, likes, isLiked };
      }
    } catch {}

    let blog: Blog | null = null;
    try {
      blog = await BlogRepository.find(blogId);
    } catch (error) {
      throw new BlogError("FETCH_FAILED", error);
    }
    if (!blog) {
      throw new BlogError("NOT_FOUND", "Blog not found");
    }

    try {
      void CacheService.set(blogKey, JSON.stringify(blog), BLOG_TTL);
    } catch {}

    const { likes, isLiked } = await this.getLikes(blog.id);

    return { ...blog, id, likes, isLiked };
  }

  private async getLikes(blogId: string) {
    try {
      const likesCountKey = blogLikesCountCK(blogId);
      const likesKey = blogLikesCK(blogId);

      const pipeline = CacheService.pipeline();
      pipeline.get(likesCountKey);
      pipeline.sIsMember(likesKey, this.user.id);

      const [likesRaw, isLikedRaw] = await pipeline.execAsPipeline();

      return { likes: Number(likesRaw), isLiked: Boolean(isLikedRaw) };
    } catch {
      return { likes: 0, isLiked: false };
    }
  }

  async create(data: CreateBlogInput) {
    let blog: Blog | null = null;
    try {
      blog = await BlogRepository.create({
        ...data,
        authorName: this.user.name,
        authorUsername: this.user.username,
        authorImage: this.user.image ?? undefined,
        userId: this.user.id,
      });
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new BlogError("ALREADY_EXISTS", error);
      }
      throw new BlogError("CREATE_FAILED", error);
    }

    try {
      const finalBlog = { ...blog, likes: 0, isLiked: false };

      const blogKey = blogCK(blog.id);
      const userBlogsKey = userBlogsCK(this.user.id);
      const userBlogsMetaKey = userBlogsMetaCK(this.user.id);
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

  async update(data: UpdateBlogInput) {
    const blogId = decodeId(data.blogId);
    if (!blogId) {
      throw new BlogError("NOT_FOUND", "Invalid ID");
    }

    let blog: Blog | null = null;
    try {
      blog = await BlogRepository.update({
        ...data,
        blogId,
        role: this.user.role,
        userId: this.user.id,
      });
    } catch (error) {
      throw new BlogError("UPDATE_FAILED", error);
    }

    const { likes, isLiked } = await this.getLikes(blog.id);

    try {
      const finalBlog = { ...blog, likes, isLiked };

      const blogKey = blogCK(blogId);
      await CacheService.set(blogKey, JSON.stringify(finalBlog), BLOG_TTL);

      if (data.imagesToDelete.length > 0) {
        ImageService.deleteMany({ publicIds: data.imagesToDelete });
      }
    } catch {}
  }

  async delete(data: DeleteBlogInput) {
    const blogId = decodeId(data.blogId);
    if (!blogId) {
      throw new BlogError("NOT_FOUND", "Invalid ID");
    }

    let images: Array<string> = [];
    try {
      images = await BlogRepository.delete({
        ...data,
        blogId,
        role: this.user.role,
        userId: this.user.id,
      });
    } catch (error) {
      throw new BlogError("DELETE_FAILED", error);
    }

    try {
      ImageService.deleteMany({ publicIds: images });

      const blogKey = blogCK(blogId);
      const likesCountKey = blogLikesCountCK(blogId);
      const likesKey = blogLikesCK(blogId);
      const commentsMetaKey = blogCommentsMetaCK(blogId);
      const commentsKey = blogCommentsCK(blogId);
      const userBlogsKey = userBlogsCK(this.user.id);
      const userLikedKey = userLikedCK(this.user.id);

      const transaction = CacheService.pipeline();
      transaction.del([blogKey, likesCountKey, likesKey, commentsMetaKey, commentsKey]);
      transaction.zRem(userBlogsKey, blogId);
      transaction.zRem(userLikedKey, blogId);

      await transaction.exec();
    } catch {}
  }

  async like(data: LikeBlogInput) {
    const blogId = decodeId(data.blogId);
    if (!blogId) {
      throw new BlogError("NOT_FOUND", "Invalid ID");
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
      const createEval = CacheService.eval();
      await createEval(likeScript, {
        keys: [
          blogLikesCountCK(blogId),
          blogLikesCK(blogId),
          userLikedMetaCK(this.user.id),
          userLikedCK(this.user.id),
        ],
        arguments: [this.user.id, blogId, Date.now().toString(), USER_LIKED_BLOGS_TTL.toString()],
      });
    } catch {}
  }

  async unLike(data: UnlikeBlogInput) {
    const blogId = decodeId(data.blogId);
    if (!blogId) {
      throw new BlogError("NOT_FOUND", "Invalid ID");
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
      const createEval = CacheService.eval();
      await createEval(unlikeScript, {
        keys: [blogLikesCountCK(blogId), blogLikesCK(blogId), userLikedCK(this.user.id)],
        arguments: [this.user.id, blogId],
      });
    } catch {}
  }
}
