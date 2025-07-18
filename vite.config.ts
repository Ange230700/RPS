// vite.config.ts

import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  optimizeDeps: {
    include: ["vitest"],
  },
  test: {
    globals: true,
    include: ["tests/**/*.spec.ts"],
    environment: "jsdom",
    reporters: ["verbose"],
    setupFiles: ["./tests/setupTest.ts"],
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "."),
    },
  },
});
