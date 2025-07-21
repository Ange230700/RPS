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
    include: ["tests/**/*.test.ts"],
    environment: "jsdom",
    reporters: ["verbose"],
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["text", "html", "json-summary"],
      exclude: [
        "tests",
        "**/*.test.*",
        "src/style.css",
        "src/types/**",
        "**/node_modules/**",
      ],
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "."),
    },
  },
});
