<script lang="ts">
  import Author from "$lib/components/author.svelte";

  const users = [
    {
      id: "123456789",
      name: "Her Meow",
      username: "hermeow",
      image: "demo",
      email: "demo@gmail.com",
      role: "user",
      createdAt: "2025-12-30T14:18:31.080Z",
      totalBlogs: 1,
      totalLikes: 1,
    },
  ];
</script>

<div class="flex min-h-dvh flex-col gap-10">
  <h1 class="border-b p-16 pb-12 text-end text-4xl font-medium">Admin Dashboard</h1>

  <div class="flex flex-col gap-6 border-b px-16 pb-12">
    <h2 class="text-end text-2xl">Recent Users</h2>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {#each users as user}
        <div class="flex flex-col gap-4 overflow-hidden rounded-4xl border p-7">
          <div class="flex justify-between">
            <Author image={user?.image || undefined} name={user.name} username={user.username} />
            <!-- {!(user.role === "admin") && <DeleteUser userId={user.id} />} -->
          </div>
          <div class="ml-1.5 flex flex-col gap-1">
            <span>
              <span class="tracking-tight">Name - </span>
              {user.name}
            </span>
            <span>
              <span class="tracking-tight">Email - </span>
              {user.email}
            </span>
            <span>
              <span class="tracking-tight">Blogs - </span>
              {user.totalBlogs}
            </span>
            <span>
              <span class="tracking-tight">Likes - </span>
              {user.totalLikes}
            </span>
            <span>
              <span class="tracking-tight">Created - </span>
              {new Intl.DateTimeFormat("en-GB", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              }).format(new Date(user.createdAt))}
            </span>
            <span class={`${user.role === "admin" && "text-red-500"}`}>
              <span class="tracking-tight">Role - </span>
              {user.role.toUpperCase()}
            </span>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <h2 class="mr-22 text-end text-2xl">Recent Blogs</h2>
  <!-- <Grid blogs={actualBlogs} />  -->
</div>
