import { createFileRoute } from "@tanstack/react-router";
import { Author } from "@/components/author";
import { DeleteUser } from "@/components/delete-user";

export const Route = createFileRoute("/(protected)/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Admin Dashboard" }],
  }),
  component: RouteComponent,
});

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

function RouteComponent() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl font-medium text-end border-b pb-12 p-16">Admin Dashboard</h1>

      <div className="flex flex-col gap-6 pb-12 px-16 border-b">
        <h2 className="text-2xl text-end">Recent Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {users.map((user) => (
            <div
              key={user.username}
              className="rounded-4xl p-7 flex flex-col gap-4 border overflow-hidden"
            >
              <div className="flex justify-between">
                <Author
                  image={user?.image || undefined}
                  name={user.name}
                  username={user.username}
                />
                {!(user.role === "admin") && <DeleteUser userId={user.id} />}
              </div>
              <div className="flex flex-col ml-1.5 gap-1">
                <span>
                  <span className="tracking-tight">Name - </span>
                  {user.name}
                </span>
                <span>
                  <span className="tracking-tight">Email - </span>
                  {user.email}
                </span>
                <span>
                  <span className="tracking-tight">Blogs - </span>
                  {user.totalBlogs}
                </span>
                <span>
                  <span className="tracking-tight">Likes - </span>
                  {user.totalLikes}
                </span>
                <span>
                  <span className="tracking-tight">Created - </span>
                  {new Intl.DateTimeFormat("en-GB", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  }).format(new Date(user.createdAt))}
                </span>
                <span className={`${user.role === "admin" && "text-red-500"}`}>
                  <span className="tracking-tight">Role - </span>
                  {user.role.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl text-end mr-22">Recent Blogs</h2>
      {/* <Grid blogs={actualBlogs} /> */}
    </div>
  );
}
