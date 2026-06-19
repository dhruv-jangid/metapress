import adapter from "@sveltejs/adapter-vercel";
import type { Config } from "@sveltejs/kit";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config: Config = {
  preprocess: vitePreprocess(),
  kit: { adapter: adapter({ runtime: "bun1.x" }) },
  compilerOptions: { runes: true },
};

export default config;
