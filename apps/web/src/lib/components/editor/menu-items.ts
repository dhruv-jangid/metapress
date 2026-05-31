import {
  TextFontIcon,
  CheckListIcon,
  Heading01Icon,
  Heading02Icon,
  Heading03Icon,
  ListViewIcon,
  QuoteDownIcon,
  SourceCodeIcon,
  Table01Icon,
  StraightEdgeIcon,
  Image01Icon,
  VideoIcon,
  BulletIcon,
  YoutubeIcon,
  Heading04Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/svelte";
import type { Editor, Range } from "@metapress/editor";

export type CommandProps = {
  editor: Editor;
  range: Range;
};

export type SlashItem = {
  title: string;
  description: string;
  searchTerms: string[];
  icon: IconSvgElement;
  command: (props: CommandProps) => void;
};

export type SlashMenuGrouped = Record<string, SlashItem[]>;

const commandGroups: SlashMenuGrouped = {
  basic: [
    {
      title: "Text",
      description: "Just start typing with plain text.",
      searchTerms: ["basic", "p", "paragraph", "text"],
      icon: TextFontIcon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run(),
    },
    {
      title: "Heading 1",
      description: "Big section heading.",
      searchTerms: ["basic", "title", "big", "large", "h1"],
      icon: Heading01Icon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run(),
    },
    {
      title: "Heading 2",
      description: "Medium section heading.",
      searchTerms: ["basic", "subtitle", "medium", "h2"],
      icon: Heading02Icon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run(),
    },
    {
      title: "Heading 3",
      description: "Small section heading.",
      searchTerms: ["basic", "subtitle", "small", "h3"],
      icon: Heading03Icon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run(),
    },
    {
      title: "Heading 4",
      description: "Extra small section heading.",
      searchTerms: ["basic", "subtitle", "extra small", "h4"],
      icon: Heading04Icon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).setNode("heading", { level: 4 }).run(),
    },
    {
      title: "Bulleted List",
      description: "Create a simple bullet list.",
      searchTerms: ["basic", "unordered", "point", "list", "ul"],
      icon: BulletIcon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleBulletList().run(),
    },
    {
      title: "Numbered List",
      description: "Create a list with numbering.",
      searchTerms: ["basic", "numbered", "ordered", "list", "ol"],
      icon: ListViewIcon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
    },
    {
      title: "To-do list",
      description: "Track tasks with a to-do list.",
      searchTerms: ["basic", "todo", "task", "list", "check", "checkbox"],
      icon: CheckListIcon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleTaskList().run(),
    },
    {
      title: "Quote",
      description: "Create a block quote.",
      searchTerms: ["basic", "blockquote", "quotes"],
      icon: QuoteDownIcon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
    },
    {
      title: "Table",
      description: "Insert a table.",
      searchTerms: ["basic", "table", "rows", "columns", "grid"],
      icon: Table01Icon,
      command: ({ editor, range }) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
    },
    {
      title: "Divider",
      description: "Insert a horizontal divider.",
      searchTerms: ["basic", "horizontal rule", "hr", "divider", "line"],
      icon: StraightEdgeIcon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
    },
  ],
  media: [
    {
      title: "Image",
      description: "Upload an image from your device.",
      searchTerms: ["media", "photo", "picture", "media", "upload"],
      icon: Image01Icon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.multiple = true;
        input.onchange = () => {
          if (!input.files?.length) return;
          for (const file of input.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result;
              if (typeof result === "string") {
                editor.chain().focus().setImage({ src: result, alt: file.name }).run();
              }
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      },
    },
    {
      title: "Video",
      description: "Upload a video from your device.",
      searchTerms: ["media", "video", "mp4", "media", "upload"],
      icon: VideoIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "video/*";
        input.onchange = () => {
          if (!input.files?.length) return;
          const file = input.files[0];
          const url = URL.createObjectURL(file);
          // swap with your actual video node command if you add one
          editor.chain().focus().insertContent(`<video src="${url}" controls></video>`).run();
        };
        input.click();
      },
    },
    {
      title: "YouTube",
      description: "Embed a YouTube video.",
      searchTerms: ["media", "youtube", "yt", "video", "embed"],
      icon: YoutubeIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        const url = prompt("Enter YouTube URL");
        if (url) editor.commands.setYoutubeVideo({ src: url });
      },
    },
    {
      title: "Code",
      description: "Insert a code snippet.",
      searchTerms: ["media", "codeblock", "code", "pre"],
      icon: SourceCodeIcon,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
  ],
};

const fuzzyMatch = (query: string, target: string): boolean => {
  let queryIndex = 0;
  target = target.toLowerCase();
  for (const char of target) {
    if (query[queryIndex] === char) queryIndex++;
    if (queryIndex === query.length) return true;
  }
  return false;
};

export const getSlashItems = ({ query }: { query: string }): any => {
  const search = query.toLowerCase();
  const filtered: SlashMenuGrouped = {};

  for (const [group, items] of Object.entries(commandGroups)) {
    const filteredItems = items.filter(
      (item) =>
        fuzzyMatch(search, item.title) ||
        item.description.toLowerCase().includes(search) ||
        item.searchTerms.some((term) => term.includes(search)),
    );
    if (filteredItems.length) filtered[group] = filteredItems;
  }

  return filtered as any;
};
