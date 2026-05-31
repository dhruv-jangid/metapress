<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

  const {
    name,
    username,
    image,
  }: {
    name: string;
    image: string | null | undefined;
    username: string;
  } = $props();
</script>

<div class="flex items-center gap-2.5">
  <Avatar>
    <AvatarImage src={image ?? undefined} alt={name} />
    <AvatarFallback>{name[0].toUpperCase() || "M"}</AvatarFallback>
  </Avatar>
  <a href="/{username}" class="max-w-3xs truncate font-medium tracking-tight hover:animate-pulse">
    {name}
  </a>
</div>
