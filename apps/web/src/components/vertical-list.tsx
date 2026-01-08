import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Author } from "./author";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export const VerticalList = ({ blogs }: { blogs: Array<Blog> }) => {
  return (
    <div className="[&>*:not(:last-child)]:border-b-2 [&>*:not(:last-child)]:border-dashed">
      {blogs.map(({ id, title, cover, createdAt, category, author }) => (
        <div
          key={id}
          className="px-4 md:px-8 lg:p-12 xl:px-0 py-8 lg:py-12 xl:py-16 lg:pr-8 flex gap-4 lg:gap-6"
        >
          <Image
            src={cover}
            alt={title}
            layout="fullWidth"
            className="object-cover aspect-3/4 lg:aspect-2/3 max-w-48 lg:max-w-64 xl:max-w-2xs rounded-4xl"
          />

          <div className="inline-flex flex-col justify-between pt-2 pb-4 lg:pb-8">
            <div className="space-y-2 lg:space-y-3.5">
              <div className="inline-flex items-center gap-3 text-sm">
                <time>
                  {new Intl.DateTimeFormat("en-GB", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }).format(new Date(createdAt))}
                </time>
                <Badge>{category}</Badge>
              </div>

              <div className="text-3xl lg:text-4xl font-medium tracking-tighter text-balance line-clamp-3 truncate max-w-2xs md:max-w-xs">
                {title}
              </div>

              <Link
                to="/$username/$blogid"
                params={{ username: author.username, blogid: id }}
                className="mt-2 lg:mt-4"
              >
                <Button>
                  Discover
                  <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} className="-ml-1" />
                </Button>
              </Link>
            </div>

            <div className="mt-16 lg:mt-0">
              <Author image={author.image} name={author.name} username={author.username} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
