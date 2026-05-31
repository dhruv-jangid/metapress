<script lang="ts">
  import Author from "$lib/components/author.svelte";
  import { baseClasses } from "$lib/components/editor/styles.js";
  import { Badge } from "$lib/components/ui/badge";
  import { orpc } from "$lib/orpc.js";
  import { Extensions } from "@metapress/editor";
  import { createQuery } from "@tanstack/svelte-query";
  import { generateHTML } from "@tiptap/html";

  import Comment from "./_components/comment.svelte";
  import EditDelete from "./_components/edit-delete.svelte";
  import Like from "./_components/like.svelte";
  import Share from "./_components/share.svelte";

  const { data } = $props();

  const blogs = createQuery(() => orpc.blog.get.queryOptions({ input: { id: data.blogId } }));

  const comments = createQuery(() =>
    orpc.comment.getMany.queryOptions({ input: { id: data.blogId } }),
  );

  const html = $derived(blogs.isSuccess ? generateHTML(blogs.data.content, Extensions()) : "");

  const isAuthor = $derived(
    data.user.role === "admin" ||
      (blogs.isSuccess && data.user.username === blogs.data.author.username),
  );
</script>

{#if !blogs.isLoading && blogs.isSuccess}
  <div class="mx-auto my-14 w-11/12 space-y-8 md:w-md lg:my-24 lg:w-xl lg:space-y-12 xl:w-3xl">
    {#if isAuthor}
      <EditDelete blogId={blogs.data.id} title={blogs.data.title} isMobile />
    {/if}

    <div class="flex justify-between">
      <h1 class="text-6xl tracking-tighter text-balance wrap-break-word lg:w-4/5">
        {blogs.data.title}
      </h1>

      {#if isAuthor}
        <EditDelete blogId={blogs.data.id} title={blogs.data.title} />
      {/if}
    </div>

    <div class="flex items-center gap-4">
      <time>
        {new Intl.DateTimeFormat("en-GB", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }).format(new Date(blogs.data.createdAt))}
      </time>
      <Badge>{blogs.data.category}</Badge>
    </div>

    <article class={baseClasses}>
      {@html html}
    </article>

    <div class="mt-24 flex items-center justify-end gap-4">
      <hr class="w-4" />
      <Author
        image={blogs.data.author.image}
        name={blogs.data.author.name}
        username={blogs.data.author.username}
      />
    </div>

    <Share username={blogs.data.author.username} blogId={blogs.data.id} />

    <div class="flex items-start justify-between">
      <Like blogId={blogs.data.id} likes={blogs.data.likes} isLiked={blogs.data.isLiked} />
      {#if !comments.isLoading && comments.isSuccess}
        <Comment
          {isAuthor}
          blogId={blogs.data.id}
          comments={comments.data.comments}
          username={data.user.username}
        />
      {/if}
    </div>
  </div>
{/if}
