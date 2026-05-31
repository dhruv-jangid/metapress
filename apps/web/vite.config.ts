import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 5173, strictPort: true },
  preview: { port: 5173, strictPort: true },
  // css: { transformer: "lightningcss" },
  plugins: [tailwindcss({ optimize: { minify: true } }), sveltekit()],
});
