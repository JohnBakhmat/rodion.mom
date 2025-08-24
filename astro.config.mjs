// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import deno from "@deno/astro-adapter";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  output: "server",
  adapter: deno(),
  integrations: [solidJs()],
});