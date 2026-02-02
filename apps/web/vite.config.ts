import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  appType: "custom",
  server: { port: 3000 },
  nitro: {
    vercel: {
      functions: { runtime: "bun1.x" },
      config: { version: 3, crons: [{ path: "/api/cron/sync-likes", schedule: "0 0 * * *" }] },
    },
    compatibilityDate: "latest",
  },
  plugins: [
    devtools(),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
