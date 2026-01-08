import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Badge } from "./ui/badge";

export const Grid = ({ blogs }: { blogs: Array<Blog> }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 xl:gap-10 p-4 md:p-8">
      {blogs.map(({ id, title, cover, category, createdAt, author }) => {
        return (
          <div key={id} className="flex rounded-4xl border overflow-hidden">
            <Image
              src={cover}
              alt={title}
              layout="fullWidth"
              className="object-cover border-r aspect-7/12 max-w-36 md:max-w-40 lg:max-w-36 xl:max-w-48"
            />

            <div className="inline-flex flex-col justify-between p-6 bg-accent min-h-72 md: w-full">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2.5 text-sm">
                  <time>
                    {new Intl.DateTimeFormat("en-GB", {
                      month: "short",
                      day: "2-digit",
                      year: "2-digit",
                    }).format(new Date(createdAt))}
                  </time>
                  <Badge>{category}</Badge>
                </div>

                <span className="line-clamp-2 text-2xl max-w-xs font-medium tracking-tighter">
                  {title}
                </span>

                <Link
                  to="/$username/$blogid"
                  params={{ username: author.username, blogid: id }}
                  className="inline-flex items-center gap-1 text-lg mt-3 underline underline-offset-4 decoration-dotted tracking-tight"
                >
                  Read <HugeiconsIcon icon={ArrowUpRight} size={14} />
                </Link>
              </div>

              <span className="truncate text-sm">
                by{" "}
                <Link
                  to="/$username"
                  params={{ username: author.username }}
                  className="inline-flex items-center gap-0.5 font-medium underline underline-offset-4 decoration-dotted opacity-70 tracking-tight"
                >
                  {author.name} <HugeiconsIcon icon={ArrowUpRight} size={12} />
                </Link>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
