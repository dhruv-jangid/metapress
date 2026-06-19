<script lang="ts">
  import { goto } from "$app/navigation";
  import Combobox from "$lib/components/combobox.svelte";
  import Editor from "$lib/components/editor/index.svelte";
  import Viewer from "$lib/components/editor/viewer.svelte";
  import { Textarea } from "$lib/components/ui/textarea";
  import { orpc } from "$lib/orpc";
  import { CreateBlogSchema } from "$lib/schema";
  import { uploadImage } from "$lib/upload-image";
  import { getFirstZodError } from "$lib/utils";
  import { base64ToFile, collectBase64Srcs, replaceImageUrls } from "$lib/utils";
  import type { BlogContent } from "@metapress/contracts/blogs";
  import { BLOG_CATEGORIES } from "@metapress/shared/blogs";
  import { createMutation } from "@tanstack/svelte-query";
  import pLimit from "p-limit";
  import { toast } from "svelte-sonner";
  import { ZodError } from "zod";

  const { data } = $props();

  let blog: {
    title: string;
    category: string;
    content?: BlogContent;
  } = $state({ title: "", category: "" });

  let loading = $state(false);

  const createBlogMutation = createMutation(() => orpc.blog.create.mutationOptions());

  const handleCreateBlog = async () => {
    loading = true;

    const toastIds: (string | number)[] = [];
    try {
      const base64Srcs = [...collectBase64Srcs(blog.content!)];

      const images = base64Srcs.map((src, i) => {
        const mimeType = src.split(";")[0].split("/")[1] || "jpeg";
        return base64ToFile(src, `image-${i + 1}-${Date.now()}.${mimeType}`);
      });

      const { title, content, category } = await CreateBlogSchema.parseAsync({
        title: blog.title,
        content: blog.content,
        category: blog.category,
        images: images,
      });

      toastIds.push(toast.loading("Uploading..."));
      const errorImages: string[] = [];
      const limit = pLimit(3);
      const imagesToUpload = images.map((file, i) =>
        limit(async () => {
          const { url, publicId } = await uploadImage(file, false);
          errorImages.push(publicId);
          return { url, publicId, originalBase64: base64Srcs[i] };
        }),
      );
      const results = await Promise.allSettled(imagesToUpload);

      const failed = results.find((r) => r.status === "rejected");
      if (failed) {
        if (errorImages.length > 0) {
          await orpc.media.deleteMany.call({ publicIds: errorImages });
        }
        throw new Error("Invalid Image(s)");
      }

      const uploadedImages = results.map(
        (r) =>
          (
            r as PromiseFulfilledResult<{
              url: string;
              publicId: string;
              originalBase64: string;
            }>
          ).value,
      );

      const allImages = uploadedImages.map(({ url, publicId }) => ({
        url,
        publicId,
      }));

      const replacements = new Map(
        uploadedImages.map(({ originalBase64, url }) => [originalBase64, url]),
      );
      const updatedContent = replaceImageUrls(content, replacements);

      const blogId = await createBlogMutation.mutateAsync({
        title,
        content: updatedContent,
        category,
        cover: allImages[0].url,
        images: allImages,
      });

      await goto(`/${data.user.username}/${blogId}`, {
        replaceState: true,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        toast.info(getFirstZodError(error));
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      loading = false;
      for (const t of toastIds) {
        toast.dismiss(t);
      }
    }
  };
</script>

<svelte:head>
  <title>Create Blog</title>
</svelte:head>

<div class="mx-auto my-14 min-h-dvh w-11/12 space-y-8 lg:my-24 lg:w-5/12">
  <Textarea
    placeholder="Title (10-100 characters)"
    onchange={(e) => (blog.title = e.currentTarget.value)}
    class="min-h-32 max-w-4/5 resize-none rounded-4xl p-5 text-6xl md:text-6xl"
    disabled={loading}
    autofocus
    required
  />

  <div class="space-x-4">
    <time>
      {new Intl.DateTimeFormat("en-GB", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(Date.now()))}
    </time>
    <Combobox bind:value={blog.category} array={BLOG_CATEGORIES} placeholder="Category" {loading} />
  </div>

  <Editor bind:content={blog.content} />

  <Viewer
    bind:title={blog.title}
    bind:category={blog.category}
    bind:content={blog.content}
    bind:loading
    onclick={handleCreateBlog}
  />
</div>
