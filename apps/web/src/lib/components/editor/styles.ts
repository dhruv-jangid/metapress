import { cn } from "$lib/utils";

export const baseClasses =
  "prose prose-slate dark:prose-invert text-foreground max-w-none bg-transparent font-serif [&_h1]:mb-2 [&_h1]:font-sans [&_h1]:text-4xl [&_h1]:font-bold [&_h2]:mb-1.5 [&_h2]:font-sans [&_h2]:text-3xl [&_h2]:font-semibold [&_h3]:mb-1 [&_h3]:font-sans [&_h3]:text-2xl [&_h3]:font-medium [&_p]:mb-1 [&_p]:text-xl [&_p]:leading-normal [&_em]:italic [&_hr]:my-4 [&_hr]:h-px [&_hr]:bg-border [&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl [&_iframe]:h-64 [&_iframe]:w-full [&_iframe]:rounded-lg [&_ul]:mb-2 [&_ul]:ml-6 [&_ul]:list-disc [&_ol]:mb-2 [&_ol]:ml-6 [&_ol]:list-decimal [&_li]:mb-0 [&_li]:leading-normal text-wrap";

export const editorClasses = cn(
  baseClasses,
  "[&_.ProseMirror]:outline-none [&_.ProseMirror_.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
);
