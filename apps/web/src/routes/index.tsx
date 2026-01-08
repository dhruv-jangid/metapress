import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import Autoplay from "embla-carousel-autoplay";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/browse" });
    }
  },
  head: () => ({
    meta: [{ title: "MetaPress" }],
  }),
  component: RouteComponent,
});

const featuredStories = [
  {
    image: "/images/creative-writing.jpg",
    category: "DESIGN",
    title: "The Art of Typography",
    author: "Sarah Jenks",
  },
  {
    image: "/images/community.jpg",
    category: "CULTURE",
    title: "Building Digital Tribes",
    author: "Marcus Chen",
  },
  {
    image: "/images/content-strategy.jpg",
    category: "TECH",
    title: "The Future of Web",
    author: "Alex Rivera",
  },
  {
    image: "/images/testing-feedback.jpg",
    category: "INSIGHTS",
    title: "Feedback Loops",
    author: "Elena Rostova",
  },
  {
    image: "/images/right.jpg",
    category: "CRAFT",
    title: "Writing with Soul",
    author: "Dhruv Jangid",
  },
];

function RouteComponent() {
  return (
    <div className="min-h-screen w-full flex flex-col selection:bg-primary selection:text-primary-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight">METAPRESS</div>
        <div className="inline-flex items-center gap-4">
          <Link
            to="/sign-in"
            className="hidden md:block text-sm hover:underline underline-offset-4"
          >
            Log in
          </Link>
          <Link to="/sign-up">
            <Button size="lg" className="font-bold tracking-wide">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      <section className="relative h-dvh w-full overflow-hidden flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 border-b">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/creative-writing.jpg"
            layout="fullWidth"
            alt="Hero Background"
            className="object-cover w-full h-full brightness-50 sepia-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 w-full flex flex-col xl:flex-row xl:items-end justify-between gap-12 xl:gap-0">
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-7xl md:text-9xl 2xl:text-[11rem] font-bold tracking-tighter leading-[0.8] text-white">
                Write.
                <br />
                Connect.
                <br />
                <span className="text-primary italic font-serif selection:bg-foreground! selection:text-primary!">
                  Inspire.
                </span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed md:pl-2">
              A digital sanctuary for storytellers. Publish your work, grow your audience, and find
              your voice.
            </p>
            <div className="pt-4 md:pl-2">
              <Link to="/sign-up">
                <Button
                  size="lg"
                  className="h-14 px-6 bg-foreground text-background text-base hover:scale-105 hover:text-primary-foreground duration-300"
                >
                  Start Reading
                  <HugeiconsIcon icon={ArrowRight01Icon} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden xl:block pb-4">
            <div className="flex flex-col items-end gap-2 text-muted-foreground text-sm font-mono rotate-0 origin-bottom-right">
              <span>SCROLL TO EXPLORE</span>
              <div className="h-16 w-px bg-muted-foreground/70" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="px-6 md:px-12 mb-16 flex justify-between items-end">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none max-w-2xl">
            Selected <br />
            <span className="text-primary italic font-serif">Stories.</span>
          </h2>
          <Link to="/browse" className="hidden md:flex items-center gap-1 text-lg">
            View Archive <HugeiconsIcon icon={ArrowRight01Icon} />
          </Link>
        </div>

        <div className="pl-6 md:pl-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {featuredStories.map((story) => (
                <CarouselItem
                  key={story.title}
                  className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="group cursor-pointer space-y-4">
                    <div className="aspect-3/4 rounded-2xl overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                      <Image
                        src={story.image}
                        layout="fullWidth"
                        alt={story.title}
                        className="object-cover w-full h-full sepia-25 scale-100 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-20 bg-background/90 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                        {story.category}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold tracking-tight leading-8 group-hover:underline decoration-1 underline-offset-4">
                        {story.title}
                      </h3>
                      <div className="text-sm text-muted-foreground font-medium">
                        By {story.author}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end pr-6 md:pr-12 pt-8 gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </section>

      <div className="relative w-full">
        <section className="relative h-[150vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <Image
              src="/images/right.jpg"
              layout="fullWidth"
              alt="Craft"
              className="object-cover w-full h-full brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white">
              <div className="max-w-4xl space-y-6">
                <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mix-blend-overlay">
                  Pure <br />
                  <span className="italic font-serif">Essence.</span>
                </h2>
                <p className="text-xl md:text-3xl font-light opacity-90 max-w-xl mx-auto leading-relaxed">
                  Strip away the noise. What remains is your truth.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative h-[150vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <Image
              src="/images/community.jpg"
              layout="fullWidth"
              alt="Community"
              className="object-cover w-full h-full brightness-75 sepia-25 scale-105"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-white">
              <div className="max-w-4xl space-y-6">
                <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mix-blend-overlay">
                  Global <br />
                  <span className="italic font-serif">Reach.</span>
                </h2>
                <p className="text-xl md:text-3xl font-light opacity-90 max-w-xl mx-auto leading-relaxed">
                  Your words, traveling further than you ever imagined.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
