<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "$lib/components/ui/carousel";
  import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Image } from "@unpic/svelte";

  import { FeaturedStories } from "./_constants";
</script>

<div
  class="selection:bg-primary selection:text-primary-foreground flex min-h-screen w-full flex-col"
>
  <header
    class="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-6 md:px-12"
  >
    <div class="text-xl font-bold tracking-tight">METAPRESS</div>
    <div class="inline-flex items-center gap-4">
      <a href="/sign-in" class="hidden text-sm underline-offset-4 hover:underline md:block">
        Log in
      </a>
      <a href="/sign-up">
        <Button size="lg" class="font-bold tracking-wide">Get Started</Button>
      </a>
    </div>
  </header>

  <section
    class="relative flex h-dvh w-full flex-col justify-end overflow-hidden border-b px-6 pb-12 md:px-12 md:pb-24"
  >
    <div class="absolute inset-0 z-0">
      <Image
        src="/images/creative-writing.jpg"
        layout="fullWidth"
        alt="Hero Background"
        class="h-full w-full scale-105 object-cover brightness-50 sepia-50"
        priority
      />
      <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
    </div>

    <div
      class="relative z-10 flex w-full flex-col justify-between gap-12 xl:flex-row xl:items-end xl:gap-0"
    >
      <div class="space-y-6">
        <div class="space-y-1">
          <h1
            class="text-7xl leading-[0.8] font-bold tracking-tighter text-white md:text-9xl 2xl:text-[11rem]"
          >
            Write.
            <br />
            Connect.
            <br />
            <span
              class="text-primary selection:bg-foreground! selection:text-primary! font-serif italic"
            >
              Inspire.
            </span>
          </h1>
        </div>
        <p class="text-muted-foreground max-w-md text-lg leading-relaxed md:pl-2 md:text-xl">
          A digital sanctuary for storytellers. Publish your work, grow your audience, and find your
          voice.
        </p>
        <div class="pt-4 md:pl-2">
          <a href="/sign-up">
            <Button
              size="lg"
              class="bg-foreground text-background hover:text-primary-foreground h-14 px-6 text-base duration-300 hover:scale-105"
            >
              Start Reading
              <HugeiconsIcon icon={ArrowRight01Icon} />
            </Button>
          </a>
        </div>
      </div>

      <div class="hidden pb-4 xl:block">
        <div
          class="text-muted-foreground flex origin-bottom-right rotate-0 flex-col items-end gap-2 font-mono text-sm"
        >
          <span>SCROLL TO EXPLORE</span>
          <div class="bg-muted-foreground/70 h-16 w-px"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-24 md:py-32">
    <div class="mb-16 flex items-end justify-between px-6 md:px-12">
      <h2 class="max-w-2xl text-5xl leading-none font-bold tracking-tighter md:text-7xl">
        Selected <br />
        <span class="text-primary font-serif italic">Stories.</span>
      </h2>
      <a href="/browse" class="hidden items-center gap-1 text-lg md:flex">
        View Archive <HugeiconsIcon icon={ArrowRight01Icon} />
      </a>
    </div>

    <div class="pl-6 md:pl-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        class="w-full"
      >
        <CarouselContent class="-ml-4 md:-ml-8">
          {#each FeaturedStories as story}
            <CarouselItem class="pl-4 md:basis-1/2 md:pl-8 lg:basis-1/3 xl:basis-1/4">
              <div class="group cursor-pointer space-y-4">
                <div class="relative aspect-3/4 overflow-hidden rounded-2xl">
                  <div
                    class="absolute inset-0 z-10 bg-black/0 transition-colors group-hover:bg-black/10"
                  ></div>
                  <Image
                    src={story.image}
                    layout="fullWidth"
                    alt={story.title}
                    class="h-full w-full scale-100 object-cover sepia-25 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    class="bg-background/90 absolute top-4 left-4 z-20 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase"
                  >
                    {story.category}
                  </div>
                </div>
                <div class="space-y-2">
                  <h3
                    class="text-2xl leading-8 font-bold tracking-tight decoration-1 underline-offset-4 group-hover:underline"
                  >
                    {story.title}
                  </h3>
                  <div class="text-muted-foreground text-sm font-medium">
                    By {story.author}
                  </div>
                </div>
              </div>
            </CarouselItem>
          {/each}
        </CarouselContent>
        <div class="flex justify-end gap-2 pt-8 pr-6 md:pr-12">
          <CarouselPrevious class="static translate-y-0" />
          <CarouselNext class="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  </section>

  <div class="relative w-full">
    <section class="relative h-[150vh]">
      <div class="sticky top-0 h-screen w-full overflow-hidden">
        <Image
          src="/images/right.jpg"
          layout="fullWidth"
          alt="Craft"
          class="h-full w-full scale-105 object-cover brightness-75"
        />
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="absolute inset-0 flex items-center justify-center p-6 text-center text-white">
          <div class="max-w-4xl space-y-6">
            <h2 class="text-6xl font-bold tracking-tighter mix-blend-overlay md:text-9xl">
              Pure <br />
              <span class="font-serif italic">Essence.</span>
            </h2>
            <p class="mx-auto max-w-xl text-xl leading-relaxed font-light opacity-90 md:text-3xl">
              Strip away the noise. What remains is your truth.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative h-[150vh]">
      <div class="sticky top-0 h-screen w-full overflow-hidden">
        <Image
          src="/images/community.jpg"
          layout="fullWidth"
          alt="Community"
          class="h-full w-full scale-105 object-cover brightness-75 sepia-25"
        />
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="absolute inset-0 flex items-center justify-center p-6 text-center text-white">
          <div class="max-w-4xl space-y-6">
            <h2 class="text-6xl font-bold tracking-tighter mix-blend-overlay md:text-9xl">
              Global <br />
              <span class="font-serif italic">Reach.</span>
            </h2>
            <p class="mx-auto max-w-xl text-xl leading-relaxed font-light opacity-90 md:text-3xl">
              Your words, traveling further than you ever imagined.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
