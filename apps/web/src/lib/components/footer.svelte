<script lang="ts">
  import {
    ArrowUpRight,
    Github01Icon,
    MailAdd01Icon,
    MessageMultiple01Icon,
    QuillWrite01Icon,
  } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Image } from "@unpic/svelte";

  import { Button } from "./ui/button";
  import { Input } from "./ui/input";
  import { Separator } from "./ui/separator";
</script>

<footer class="flex flex-col gap-12 border-t border-dashed p-4 md:p-8">
  <div
    class="bg-foreground text-background selection:bg-background selection:text-foreground flex h-auto flex-col justify-between rounded-4xl p-4 xl:h-132 xl:flex-row"
  >
    <div class="space-y-4 p-2 xl:p-4">
      <div class="tracking-tighter">START A NEW JOURNEY</div>
      <div class="mb-8 text-4xl tracking-tighter xl:text-6xl xl:leading-14">
        <div>Interested in working with us?</div>
        <div>Start a conversation now.</div>
      </div>
      <a href="/contact" target="_blank">
        <Button>
          <HugeiconsIcon icon={MessageMultiple01Icon} />
          Contact Us
        </Button>
      </a>
    </div>

    <Image
      src="/images/creative-writing.jpg"
      alt="Creative Writing"
      layout="fullWidth"
      class="mt-8 aspect-video h-64 w-full rounded-3xl border object-cover brightness-90 sepia-50 md:h-96 xl:mt-0 xl:aspect-3/4 xl:h-4/5 xl:w-auto xl:self-end"
    />
  </div>

  <section class="flex flex-col gap-12 md:gap-16 lg:flex-row lg:gap-0">
    <div class="w-full space-y-32 lg:space-y-56">
      <div class="space-y-10 lg:space-y-16">
        <div class="text-5xl tracking-tight lg:text-6xl">
          We shape ideas,
          <br />
          connection,
          <br />
          stories.
        </div>

        <div class="inline-flex items-center gap-6">
          <span class="text-lg underline decoration-dotted underline-offset-10 lg:text-xl">
            info@metapress.it
          </span>
          <a
            href="https://github.com/notyotype/metapress"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HugeiconsIcon icon={Github01Icon} />
          </a>
        </div>
      </div>

      <div
        class="text-muted-foreground flex flex-col justify-between gap-2 text-sm xl:w-5/6 xl:flex-row xl:items-center xl:gap-0 2xl:w-2/3"
      >
        <span>&copy; {new Date().getFullYear()}. All rights reserved.</span>
        <div class="inline-flex gap-6 xl:w-1/2 xl:justify-between xl:gap-0 xl:self-end 2xl:w-5/12">
          <a
            href="/policies#terms"
            class="inline-flex items-center gap-0.5 tracking-tight underline decoration-dotted underline-offset-8"
          >
            Terms of Use <HugeiconsIcon icon={ArrowUpRight} size={16} />
          </a>
          <a
            href="/policies#privacy"
            class="inline-flex items-center gap-0.5 tracking-tight underline decoration-dotted underline-offset-8"
          >
            Privacy Policy <HugeiconsIcon icon={ArrowUpRight} size={16} />
          </a>
        </div>
      </div>
    </div>

    <Separator class="lg:hidden" />

    <div class="flex flex-col justify-between gap-12 lg:mt-1.5 lg:w-2/3">
      <div>
        <span class="text-2xl tracking-tight">Subscribe to the newsletter</span>
        <div class="relative w-full xl:w-2/3">
          <Input
            type="email"
            placeholder="Enter your email address"
            class="rounded-none border-0 border-b bg-transparent py-8 pr-12 tracking-tight shadow-none md:py-10"
          />
          <Button size="icon" class="absolute top-4 right-0 md:top-6">
            <HugeiconsIcon icon={MailAdd01Icon} />
          </Button>
        </div>
      </div>

      <address class="not-italic">
        <div>Home, 123</div>
        <div>Vadodara, Gujarat</div>
        <div>India</div>
      </address>

      <div class="text-muted-foreground flex justify-between text-sm">
        <span>
          Site by{" "}
          <a
            href="https://dhrvjgd.tech"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-0.5 underline decoration-dotted underline-offset-8"
          >
            Dhruv Jangid <HugeiconsIcon icon={ArrowUpRight} size={16} />
          </a>
        </span>
        <div class="inline-flex items-center gap-1.5">
          MetaPress
          <HugeiconsIcon icon={QuillWrite01Icon} size={16} strokeWidth={2} />
        </div>
      </div>
    </div>
  </section>
</footer>
