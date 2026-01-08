import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";

export const UserGrid = ({ blogs }: { blogs: Array<Blog> }) => {
  return (
    <div className="grid grid-cols-3 2xl:grid-cols-4 gap-1 lg:border lg:rounded-4xl overflow-hidden">
      {blogs.map(({ id, title, cover, author }) => {
        return (
          <div
            key={id}
            className="relative flex flex-col aspect-square justify-end outline group overflow-hidden"
          >
            <Link
              to="/$username/$blogid"
              params={{ username: author.username, blogid: id }}
              className="relative block h-full"
            >
              <Image
                src={cover}
                alt={title}
                layout="fullWidth"
                priority={false}
                className="cursor-pointer object-cover aspect-square"
              />
              <div className="absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 w-full text-center line-clamp-3 transition-all duration-200 translate-y-8 group-hover:translate-y-0 backdrop-blur-xl group-hover:bg-black/20 text-lg text-balance px-2">
                {title}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
