import type { BlogContent } from "@metapress/contracts/blogs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z, type ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export const getFirstZodError = (error: ZodError): string => {
  const flat = z.flattenError(error);
  const fieldError = Object.values(flat.fieldErrors).flat()[0] as string;
  const formError = flat.formErrors[0];

  return fieldError || formError || "Validation Error";
};

export const extractPublicId = (url: string) => {
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) {
      throw new Error("Invalid Cloudinary URL");
    }

    let afterUpload = parts[1];
    const versionIndex = afterUpload.indexOf("/v");
    if (versionIndex !== -1) {
      afterUpload = afterUpload.slice(versionIndex + 1);
    }

    afterUpload = afterUpload.replace(/^v[0-9]+\/?/, "");

    const withoutExtension = afterUpload.replace(/\.[^/.]+$/, "");

    return withoutExtension;
  } catch {
    throw new Error("Invalid Cloudinary URL");
  }
};

export const replaceImageUrls = (
  content: BlogContent,
  replacements: Map<string, string>,
): BlogContent => {
  const processNode = (node: BlogContent): BlogContent => {
    if (!node || typeof node !== "object") return node;
    if (node.type === "image" && node.attrs?.src && replacements.has(node.attrs.src))
      return { ...node, attrs: { ...node.attrs, src: replacements.get(node.attrs.src)! } };
    if (Array.isArray(node.content)) return { ...node, content: node.content.map(processNode) };
    return node;
  };
  return processNode(content);
};

export const collectBase64Srcs = (node: BlogContent, acc = new Set<string>()) => {
  if (node?.type === "image" && node.attrs?.src?.startsWith("data:image/")) {
    acc.add(node.attrs.src);
  }
  node.content?.forEach((child: any) => collectBase64Srcs(child, acc));
  return acc;
};

export const base64ToFile = (base64: string, filename: string) => {
  const [header, data] = base64.split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "image/jpeg";
  const binaryString = atob(data);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new File([bytes], filename, { type: mime });
};

const isCloudinaryUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.endsWith("cloudinary.com");
  } catch {
    return false;
  }
};
export const extractImageUrls = (content: BlogContent) => {
  const cloudinaryUrls: string[] = [];
  const processedUrls = new Set<string>();

  const processNode = (node: BlogContent) => {
    if (!node || typeof node !== "object") return;

    if (
      node.type === "image" &&
      node.attrs?.src &&
      typeof node.attrs.src === "string" &&
      isCloudinaryUrl(node.attrs.src) &&
      !processedUrls.has(node.attrs.src)
    ) {
      cloudinaryUrls.push(node.attrs.src);
      processedUrls.add(node.attrs.src);
    }

    if (Array.isArray(node.content)) {
      node.content.forEach(processNode);
    }
  };

  processNode(content);
  return cloudinaryUrls;
};
