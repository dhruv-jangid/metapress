<script lang="ts">
  import { goto } from "$app/navigation";
  import Combobox from "$lib/components/combobox.svelte";
  import Editor from "$lib/components/editor/index.svelte";
  import Viewer from "$lib/components/editor/viewer.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Textarea } from "$lib/components/ui/textarea";
  import { orpc } from "$lib/orpc.js";
  import { EditBlogSchema } from "$lib/schema.js";
  import { uploadImage } from "$lib/upload-image.js";
  import {
    base64ToFile,
    collectBase64Srcs,
    extractImageUrls,
    extractPublicId,
    getFirstZodError,
    replaceImageUrls,
  } from "$lib/utils.js";
  import { X } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { BLOG_CATEGORIES } from "@metapress/api/schemas/common";
  import { createMutation } from "@tanstack/svelte-query";
  import pLimit from "p-limit";
  import { toast } from "svelte-sonner";
  import { ZodError } from "zod";

  const { data } = $props();

  // svelte-ignore state_referenced_locally
  let blog = $state(data.blog);

  let loading = $state(false);

  const editBlogMutation = createMutation(() => orpc.blog.update.mutationOptions());

  const handleEditBlog = async () => {
    loading = true;

    const toastIds: (string | number)[] = [];
    try {
      const newBase64Urls = [...collectBase64Srcs(blog.content)];

      const newImages = newBase64Urls.map((src, i) => {
        const mimeType = src.split(";")[0].split("/")[1] || "jpeg";
        return base64ToFile(src, `image-${i + 1}-${Date.now()}.${mimeType}`);
      });

      const existingImageUrls = extractImageUrls(blog.content);

      const imagesToKeep = existingImageUrls.map((url) => ({
        url,
        publicId: extractPublicId(url),
      }));

      const oldImageUrls = extractImageUrls(data.blog.content);

      const imagesToDelete = oldImageUrls
        .filter((url) => !existingImageUrls.includes(url))
        .map((url) => extractPublicId(url));

      const { title, category, content } = await EditBlogSchema.parseAsync({
        title: blog.title,
        content: blog.content,
        category: blog.category,
        newImages: newImages,
        imagesToKeep: imagesToKeep,
      });

      toastIds.push(toast.loading("Updating..."));
      let uploadedImages: Array<{
        url: string;
        publicId: string;
        originalBase64: string;
      }> = [];
      const errorImages: string[] = [];

      if (newImages.length > 0) {
        const limit = pLimit(3);
        const imagesToUpload = newImages.map((image, index) =>
          limit(async () => {
            const { url, publicId } = await uploadImage(image, false);
            errorImages.push(publicId);
            return {
              url,
              publicId,
              originalBase64: newBase64Urls[index],
            };
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

        uploadedImages = results.map(
          (r) =>
            (
              r as PromiseFulfilledResult<{
                url: string;
                publicId: string;
                originalBase64: string;
              }>
            ).value,
        );
      }

      const finalImages = [
        ...imagesToKeep,
        ...uploadedImages.map(({ url, publicId }) => ({ url, publicId })),
      ];

      const replacements = new Map([
        ...imagesToKeep.map(({ url }) => [url, url] as [string, string]),
        ...uploadedImages.map(
          ({ originalBase64, url }) => [originalBase64, url] as [string, string],
        ),
      ]);

      const finalContent = replaceImageUrls(content, replacements);

      await editBlogMutation.mutateAsync({
        blogId: data.blog.id,
        title,
        content: finalContent,
        category,
        cover: finalImages[0].url,
        images: finalImages,
        imagesToDelete,
      });

      await goto(`/${data.user.username}/${data.blogId}`, {
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

<div class="mx-auto my-12 flex flex-col gap-8 lg:my-22 lg:w-5/12 lg:gap-12">
  <Textarea
    id="title"
    bind:value={blog.title}
    placeholder="Title (10-100 characters)"
    maxlength={100}
    class="min-h-32 max-w-4/5 resize-none p-5 text-6xl md:text-6xl"
    disabled={loading}
    autofocus
    required
  />

  <div class="space-x-4">
    <time>
      {new Intl.DateTimeFormat("en-GB", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(blog.createdAt))}
    </time>
    <Combobox array={BLOG_CATEGORIES} placeholder="Category" bind:value={blog.category} {loading} />
  </div>

  <Editor bind:content={blog.content} />

  <div class="self-end">
    <a href="/" class="mr-1.5">
      <Button variant="destructive" size="lg">
        Cancel <HugeiconsIcon icon={X} />
      </Button>
    </a>

    <Viewer
      bind:title={blog.title}
      bind:category={blog.category}
      bind:content={blog.content}
      bind:loading
      onclick={handleEditBlog}
    />
  </div>
</div>
