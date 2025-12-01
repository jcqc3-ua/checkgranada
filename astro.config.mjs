import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://alhambra-tours.com",
  integrations: [sitemap()],
  output: "static",
  trailingSlash: "never",
});
