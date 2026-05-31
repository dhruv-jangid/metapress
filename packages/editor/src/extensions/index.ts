import { ALLOWED_IMAGE_TYPES } from "@metapress/api/schemas/common";
import type { Extensions as Es } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/extension-bubble-menu";
import { DragHandle } from "@tiptap/extension-drag-handle";
import { Emoji, gitHubEmojis } from "@tiptap/extension-emoji";
import { FileHandler } from "@tiptap/extension-file-handler";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Table, TableCell, TableRow, TableHeader } from "@tiptap/extension-table";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Typography } from "@tiptap/extension-typography";
import { Youtube } from "@tiptap/extension-youtube";
import { Placeholder, Selection } from "@tiptap/extensions";
import { StarterKit } from "@tiptap/starter-kit";
import type { SuggestionOptions } from "@tiptap/suggestion";

import { LinkExtension } from "./link-extension";
import { SlashCommandExtension } from "./slash-extension";

export const Extensions = (options?: Partial<SuggestionOptions>) =>
  [
    StarterKit.configure({
      code: { HTMLAttributes: { spellcheck: false } },
      link: false,
      heading: { levels: [1, 2, 3, 4] },
    }),
    Image.configure({
      allowBase64: false,
      inline: true,
      HTMLAttributes: { class: "editor-image" },
    }),
    FileHandler.configure({
      allowedMimeTypes: ALLOWED_IMAGE_TYPES,
      onDrop: (editor, files, pos) => {
        for (const file of files) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result;
            if (typeof result === "string") {
              editor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: { src: result, alt: file.name },
                })
                .focus()
                .run();
            }
          };
          reader.readAsDataURL(file);
        }
      },
      onPaste: (editor, files) => {
        for (const file of files) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result;
            if (typeof result === "string") {
              editor
                .chain()
                .insertContent({
                  type: "image",
                  attrs: { src: result, alt: file.name },
                })
                .focus()
                .run();
            }
          };
          reader.readAsDataURL(file);
        }
      },
    }),
    DragHandle.configure({
      render() {
        const el = document.createElement("div");
        el.classList.add("drag-handle");
        el.innerHTML = "⠿";
        return el;
      },
    }),
    TaskList,
    TaskItem.configure({ nested: true }),
    Table.configure({
      resizable: true,
      lastColumnResizable: false,
      allowTableNodeSelection: true,
    }),
    TableRow,
    TableCell,
    TableHeader,
    Highlight.configure({ multicolor: true }),
    Typography,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === "heading") {
          return `Heading ${node.attrs.level}`;
        }
        if (node.type.name === "detailsSummary") {
          return "Toggle title";
        }
        if (node.type.name === "paragraph") {
          return 'Write anything. Enter "/" for commands';
        }
        return "";
      },
      includeChildren: true,
      showOnlyWhenEditable: true,
    }),
    Emoji.configure({
      emojis: gitHubEmojis,
      enableEmoticons: true,
    }),
    Youtube.configure({
      addPasteHandler: false,
      controls: true,
      nocookie: true,
    }),
    Selection,
    TextStyleKit,
    BubbleMenu,
    LinkExtension,
    Superscript,
    Subscript,
    SlashCommandExtension.configure({
      suggestion: {
        items: options?.items,
        render: options?.render,
      },
    }),
  ] as Es;
