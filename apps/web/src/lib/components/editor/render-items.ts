import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  type VirtualElement,
} from "@floating-ui/dom";
import type { SuggestionKeyDownProps, SuggestionProps } from "@metapress/editor";
import { mount, unmount } from "svelte";
import { writable, type Writable } from "svelte/store";

import CommandList from "./command-list.svelte";
import type { SlashItem, SlashMenuGrouped } from "./menu-items";

type SlashSuggestionProps = SuggestionProps & {
  items: SlashMenuGrouped;
  command: (item: SlashItem) => void;
};

type CommandListHandle = {
  onKeyDown: (event: KeyboardEvent) => boolean;
};

const fallbackRect = (): DOMRect =>
  ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => undefined,
  }) as DOMRect;

export const renderItems = () => {
  let component: CommandListHandle | null = null;
  let target: HTMLDivElement | null = null;
  let suggestion: Writable<SlashSuggestionProps> | null = null;
  let latestProps: SlashSuggestionProps | null = null;
  let latestRect: DOMRect | null = null;
  let cleanupAutoUpdate: (() => void) | null = null;

  const reference: VirtualElement = {
    getBoundingClientRect: () => latestRect ?? fallbackRect(),
    get contextElement() {
      return latestProps?.editor.view.dom;
    },
  };

  const updatePosition = async () => {
    latestRect = latestProps?.clientRect?.() ?? null;

    if (!target || !latestRect) {
      if (target) target.style.visibility = "hidden";
      return;
    }

    const { x, y } = await computePosition(reference, target, {
      placement: "bottom-start",
      strategy: "fixed",
      middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
    });

    if (!target) return;

    Object.assign(target.style, {
      left: `${x}px`,
      top: `${y}px`,
      visibility: "visible",
    });
  };

  const destroy = () => {
    cleanupAutoUpdate?.();
    cleanupAutoUpdate = null;

    if (component) {
      void unmount(component);
      component = null;
    }

    target?.remove();
    target = null;
    suggestion = null;
    latestProps = null;
    latestRect = null;
  };

  return {
    onStart: (props: SuggestionProps) => {
      if (!props.clientRect) return;

      destroy();

      latestProps = props as SlashSuggestionProps;
      suggestion = writable(props as SlashSuggestionProps);
      target = document.createElement("div");
      Object.assign(target.style, {
        position: "fixed",
        left: "0",
        top: "0",
        zIndex: "50",
        visibility: "hidden",
        width: "max-content",
      });
      document.body.appendChild(target);

      component = mount(CommandList, {
        target,
        props: { suggestion },
      }) as CommandListHandle;

      cleanupAutoUpdate = autoUpdate(reference, target, updatePosition);
      void updatePosition();
    },

    onUpdate: (props: SuggestionProps) => {
      latestProps = props as SlashSuggestionProps;
      suggestion?.set(props as SlashSuggestionProps);
      void updatePosition();
    },

    onKeyDown: (props: SuggestionKeyDownProps) => {
      if (props.event.key === "Escape") {
        destroy();
        return true;
      }

      return component?.onKeyDown(props.event) ?? false;
    },

    onExit: destroy,
  };
};
