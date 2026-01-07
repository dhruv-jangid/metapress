import {
  ArrowUpRight,
  CustomerService01Icon,
  Github01Icon,
  MailAdd01Icon,
  QuillWrite01Icon,
} from "@hugeicons/core-free-icons";
import { Image } from "@unpic/react";
import { Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="p-6 md:p-8 flex flex-col gap-12 border-t border-dashed">
      <div className="flex flex-col xl:flex-row justify-between p-4 bg-foreground rounded-4xl h-auto xl:h-132 text-background selection:bg-background selection:text-foreground">
        <div className="p-2 xl:p-4 space-y-4">
          <div className="tracking-tighter">START A NEW JOURNEY</div>
          <div className="text-4xl xl:text-6xl tracking-tighter xl:leading-14 mb-8">
            <div>Interested in working with us?</div>
            <div>Start a conversation now.</div>
          </div>
          <Link to="/contact">
            <Button>
              <HugeiconsIcon icon={CustomerService01Icon} />
              Contact Us
            </Button>
          </Link>
        </div>

        <Image
          src="/images/creative-writing.jpg"
          alt="Creative Writing"
          layout="fullWidth"
          className="object-cover rounded-3xl border sepia-50 brightness-90 w-full xl:w-auto h-64 md:h-96 xl:h-4/5 aspect-video xl:aspect-3/4 xl:self-end mt-8 xl:mt-0"
        />
      </div>

      <section className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-0">
        <div className="w-full space-y-32 lg:space-y-56">
          <div className="space-y-10 lg:space-y-16">
            <div className="text-5xl lg:text-6xl tracking-tight">
              We shape ideas,
              <br />
              connection,
              <br />
              stories.
            </div>

            <div className="inline-flex items-center gap-6">
              <span className="text-lg lg:text-xl underline underline-offset-10 decoration-dotted">
                info@metapress.it
              </span>
              <a
                href="https://github.com/dhruv-jangid/nextblog"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HugeiconsIcon icon={Github01Icon} />
              </a>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-2 xl:gap-0 xl:w-5/6 2xl:w-2/3 text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()}. All rights reserved.</span>
            <div className="xl:self-end inline-flex xl:justify-between xl:w-1/2 2xl:w-5/12 gap-6 xl:gap-0">
              <Link
                to="/"
                className="underline underline-offset-8 decoration-dotted tracking-tight inline-flex items-center gap-0.5"
              >
                Terms of Use <HugeiconsIcon icon={ArrowUpRight} size={16} />
              </Link>
              <Link
                to="/"
                className="underline underline-offset-8 decoration-dotted tracking-tight inline-flex items-center gap-0.5"
              >
                Privacy Policy <HugeiconsIcon icon={ArrowUpRight} size={16} />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="lg:hidden" />

        <div className="lg:mt-1.5 lg:w-2/3 flex flex-col justify-between gap-12">
          <div>
            <span className="text-2xl tracking-tight">Subscribe to the newsletter</span>
            <div className="relative w-full xl:w-2/3">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="border-0 shadow-none border-b rounded-none py-8 md:py-10 pr-12 tracking-tight bg-transparent!"
              />
              <Button size="icon" className="absolute right-0 top-4 md:top-6">
                <HugeiconsIcon icon={MailAdd01Icon} />
              </Button>
            </div>
          </div>

          <address className="not-italic">
            <div>Home, 123</div>
            <div>Vadodara, Gujarat</div>
            <div>India</div>
          </address>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Site by{" "}
              <a
                href="https://github.com/dhruv-jangid"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-8 decoration-dotted inline-flex items-center gap-0.5"
              >
                Dhruv Jangid <HugeiconsIcon icon={ArrowUpRight} size={16} />
              </a>
            </span>
            <div className="inline-flex items-center gap-1.5">
              MetaPress
              <HugeiconsIcon icon={QuillWrite01Icon} size={16} strokeWidth={2} />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
