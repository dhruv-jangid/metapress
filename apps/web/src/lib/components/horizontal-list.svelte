<script lang="ts">
  import { cn } from "$lib/utils";
  import { Image } from "@unpic/svelte";
  import Autoplay from "embla-carousel-autoplay";

  import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

  let {
    data,
    imageOnly,
  }: {
    data: { image: string; tag?: string; title: string; content?: string }[];
    imageOnly?: boolean;
  } = $props();
</script>

<Carousel
  opts={{ align: "start", loop: true }}
  plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
  class="px-4 md:max-w-md lg:max-w-2xl xl:max-w-5xl xl:p-0 2xl:max-w-full"
>
  <CarouselContent>
    {#each data as { image, title, tag, content }, i}
      <CarouselItem
        class={cn(
          imageOnly
            ? "basis-1/2 md:basis-[calc(1/2.5*100%)] xl:basis-[calc(1/3.5*100%)] 2xl:basis-1/5"
            : "xl:basis-1/2 2xl:basis-5/12",
          "flex cursor-default select-none xl:pl-16",
        )}
      >
        <Image
          src={image}
          alt={title}
          width={280}
          height={342}
          sizes="(max-width: 1024px) 100vw, 60vw"
          class="aspect-2/3 w-40 rounded-xl border object-cover brightness-90 sepia-50 md:w-52"
        />
        <div
          class={cn(
            imageOnly ? "hidden" : "flex",
            "flex-col justify-between pt-2 pl-3 md:gap-16 xl:pt-4 xl:pl-6",
          )}
        >
          <div class="space-y-1">
            <div class="text-xs font-medium tracking-tight md:text-sm">{tag}</div>
            <div class="text-2xl font-medium tracking-tighter md:text-3xl xl:text-4xl">
              {title}
            </div>
            <div class="mt-4 max-w-2xs text-sm leading-tight text-balance">{content}</div>
          </div>
          <div class="-mb-3.5 text-8xl md:-mb-4 xl:text-9xl">{i + 1}</div>
        </div>
      </CarouselItem>
    {/each}
  </CarouselContent>
</Carousel>
