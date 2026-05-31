<script lang="ts">
  import HorizontalList from "$lib/components/horizontal-list.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import { MessageMultiple01Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Image } from "@unpic/svelte";

  import { MyStepsList } from "./_constants/steps-list";
  import { MyTakesList } from "./_constants/takes-list";
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<section class="mt-8 space-y-16">
  <div class="mb-0 flex flex-col justify-between gap-16 p-6 md:p-12 lg:flex-row lg:gap-0">
    <div class="space-y-2 font-medium">
      <span class="text-primary text-sm tracking-tight">MY STEPS</span>
      <div class="text-5xl tracking-tighter xl:text-6xl">
        My creative workflow
        <br />
        it&apos;s not just a vision.
      </div>
    </div>
    <div class="space-y-4 md:space-y-8">
      <div class="text-primary w-3xs tracking-tight text-balance xl:w-xs">
        "I find my work fulfilling when insight, timing, and authenticity come together"
      </div>
      <span class="text-sm font-semibold">DHRUV JANGID</span>
    </div>
  </div>
  <HorizontalList data={MyStepsList} />

  <div class="flex flex-col overflow-hidden px-6 md:px-12 lg:flex-row">
    <div class="relative aspect-square w-full overflow-hidden rounded-xl border lg:w-1/2">
      <Image
        src="/images/creativity-process.jpg"
        alt="Creativity Process Image"
        layout="fullWidth"
        class="object-cover sepia-50"
      />
    </div>
    <div class="flex w-full flex-col justify-center gap-2 p-4 lg:w-1/2 lg:gap-4 2xl:p-0 2xl:pl-16">
      <div class="text-sm">KNOW HOW</div>
      <div class="text-6xl leading-14 tracking-tighter xl:text-7xl xl:leading-16">
        <div>Creativity</div>
        <div>and Innovation</div>
        <div>built-in.</div>
      </div>
      <div class="my-2 max-w-sm leading-snug">
        From the first spark of an idea to the final published piece, creativity drives everything I
        do. Each blog post is crafted through exploration, design, and a touch of innovation —
        blending storytelling with modern digital tools. I believe in experimenting, learning, and
        evolving with every article I write.
      </div>
      <a href="/contact" class="w-max">
        <Button size="lg">
          <HugeiconsIcon icon={MessageMultiple01Icon} />
          Contact Us
        </Button>
      </a>
    </div>
  </div>

  <Separator />

  <div class="flex flex-col justify-between gap-16 px-6 md:px-12 lg:flex-row lg:gap-0">
    <div class="space-y-2 font-medium">
      <span class="text-sm tracking-tight text-orange-500">MY TAKES</span>
      <div class="text-5xl tracking-tighter xl:text-6xl">
        Not just an IDE,
        <br />
        but a big family.
      </div>
    </div>
    <div class="space-y-4 md:space-y-8">
      <div class="w-3xs tracking-tight text-balance text-orange-500 xl:w-xs">
        "The real magic happens when insight meets timing — and everything feels true to who I am"
      </div>
      <span class="text-sm font-semibold">DHRUV JANGID</span>
    </div>
  </div>

  <HorizontalList data={MyTakesList} imageOnly />

  <div class="flex w-full flex-col items-end gap-4 overflow-hidden lg:flex-row">
    <Image
      src="/images/left.jpg"
      alt="Pencil"
      layout="fullWidth"
      class="h-96 w-full rounded-4xl rounded-l-none border border-l-0 object-cover brightness-90 sepia-50 xl:h-132 xl:w-7/12 2xl:h-172"
    />
    <Image
      src="/images/right.jpg"
      alt="Pencils"
      layout="fullWidth"
      class="h-64 w-2/3 rounded-4xl rounded-r-none border border-r-0 object-cover brightness-90 contrast-125 sepia-50 xl:h-96 xl:w-5/12 2xl:h-124"
    />
  </div>

  <div class="flex flex-col justify-between gap-16 p-4 xl:flex-row xl:gap-0 xl:px-12 xl:py-36">
    <div class="space-y-36 xl:space-y-24">
      <div class="relative">
        <span class="text-8xl leading-0 font-light xl:text-[12rem]">&ldquo;</span>
        <span
          class="absolute -top-10 left-9 text-2xl font-medium tracking-tighter xl:-top-16 xl:left-15 xl:w-3xl xl:text-4xl"
        >
          We&apos;re always exploring new ideas
        </span>
        <span
          class="absolute -top-2 left-0 w-xs text-2xl font-medium tracking-tighter xl:-top-5.5 xl:w-2xl xl:text-4xl"
        >
          and creative approaches — pushing boundaries to make every story smarter, fresher, and
          more meaningful.
        </span>
      </div>
      <div class="inline-flex">
        <div class="relative aspect-3/4 w-24">
          <Image
            src="/images/me.png"
            alt="Me"
            layout="fullWidth"
            class="rounded-xl border object-cover sepia-50"
          />
        </div>
        <div class="space-y-2 pl-4">
          <div class="text-sm tracking-tight text-orange-500">MetaPress</div>
          <div>
            <div class="text-2xl font-medium tracking-tighter">Dhruv Jangid</div>
            <div class="tracking-tight">CEO & Founder</div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-8 xl:-mt-18 xl:gap-24 xl:pr-16">
      <div class="space-y-4 border-b pb-12 xl:space-y-8 xl:pb-24">
        <div class="flex gap-4 xl:gap-8">
          <span class="text-3xl leading-7 font-semibold tracking-tight xl:text-4xl"> 23K </span>
          <div class="flex flex-col leading-4">
            <span>Daily</span>
            <span>Readers</span>
          </div>
        </div>
        <div class="max-w-3xs text-sm text-balance">
          Our growing community of readers who engage with fresh stories and insights every day.
        </div>
      </div>
      <div class="space-y-4 border-b pb-12 xl:space-y-8 xl:pb-24">
        <div class="flex gap-4 xl:gap-8">
          <span class="text-3xl leading-7 font-semibold tracking-tight xl:text-4xl"> 38K </span>
          <div class="flex flex-col leading-4">
            <span>Words</span>
            <span>Published</span>
          </div>
        </div>
        <div class="max-w-3xs text-sm text-balance">
          From deep dives to creative essays — a reflection of our passion for storytelling and
          sharing ideas.
        </div>
      </div>
      <div class="space-y-4 border-b pb-12 xl:space-y-8 xl:pb-24">
        <div class="flex gap-4 xl:gap-8">
          <span class="text-3xl leading-7 font-semibold tracking-tight xl:text-4xl"> 85% </span>
          <div class="flex flex-col leading-4">
            <span>Original</span>
            <span>Content</span>
          </div>
        </div>
        <div class="max-w-3xs text-sm text-balance">
          Most of our posts are built from authentic experiences, thoughts, and perspectives — no AI
          fluff, just real voices.
        </div>
      </div>
      <div class="space-y-4 border-b pb-12 xl:space-y-8 xl:pb-24">
        <div class="flex gap-4 xl:gap-8">
          <span class="text-3xl leading-7 font-semibold tracking-tight xl:text-4xl"> 168 </span>
          <div class="flex flex-col leading-4">
            <span>Collaborators</span>
            <span>& Writers</span>
          </div>
        </div>
        <div class="max-w-3xs text-sm text-balance">
          A vibrant network of contributors, editors, and creatives shaping our platform together.
        </div>
      </div>
    </div>
  </div>
</section>
