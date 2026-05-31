<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="flex h-dvh w-full flex-col justify-between overflow-hidden">
  <div class="ml-4 grid h-1/5 w-full grid-cols-3 items-end lg:ml-8 lg:h-1/4">
    {#each Array(6)}
      <span class="text-muted-foreground text-sm tracking-tighter">NOT FOUND</span>
    {/each}
  </div>

  <div class="ml-4 w-fit text-8xl leading-20 font-medium lg:ml-32 xl:ml-48">
    {#if page.status === 404}
      <div class="tracking-tighter">NOT</div>
      <div class="tracking-tighter">FOUND</div>
    {:else}
      <div class="tracking-tighter">{page.error?.message}</div>
    {/if}
  </div>

  <div
    class="text-input mr-6 text-end text-[14rem] leading-none -tracking-widest lg:mr-12 xl:text-[28rem]"
  >
    {page.status}
  </div>

  <div class="text-muted-foreground text-2xl tracking-tight lg:text-xl xl:text-5xl">
    YOU DIDN&apos;T DESTROY ANY INJECTION MOULDS, BUT IT LOOKS LIKE YOU&apos;RE LOST. DON&apos;T
    WORRY. YOU CAN HEAD OVER TO THE{" "}
    <a href="/browse" class="text-foreground underline underline-offset-4">HOMEPAGE</a>{" "}
    OR TO THE{" "}
    <a href="/contact" class="text-foreground underline underline-offset-4">CONTACT</a>{" "}
    PAGE IF YOU HAVEN&apos;T HAD ENOUGH. A LAB EXPERIMENT IN, FOR SURE.
  </div>
</div>
