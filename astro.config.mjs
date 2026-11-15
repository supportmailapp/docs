// @ts-check
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
// Imported here, not in src/config/plugins.ts: the workerd dev dependency scanner
// crawls src/ and breaks on this build-only plugin's CLI dependencies.
import starlightLinksValidator from "starlight-links-validator";
import components from "./src/config/components";
import head from "./src/config/head";
import plugins from "./src/config/plugins";
import sidebar from "./src/config/sidebar";
import social from "./src/config/social";

export default defineConfig({
  output: "static",
  adapter: cloudflare({ imageService: "compile", prerenderEnvironment: "node" }),
  site: "https://docs.supportmail.dev",
  trailingSlash: "ignore",
  env: {
    schema: {
      PUBLIC_DASHBOARD_URL: envField.string({
        access: "public",
        default: "https://dash.supportmail.dev",
        context: "client",
        optional: true,
      }),
      ALGOLIA_APP_ID: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      ALGOLIA_SEARCH_API_KEY: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      ALGOLIA_INDEX_NAME: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  integrations: [
    svelte({ extensions: [".svelte"] }),
    starlight({
      title: "SupportMail",
      description:
        "Documentation for SupportMail, the feature-rich modmail bot for Discord.",
      logo: {
        src: "./src/assets/logo.png",
        alt: "SupportMail Logo",
        replacesTitle: false,
      },
      favicon: "/favicon.ico",
      credits: true,
      social,
      editLink: {
        baseUrl: "https://github.com/supportmailapp/docs/tree/main",
      },
      pagefind: true,
      lastUpdated: true,
      customCss: ["./src/styles/global.css", "./src/styles/tokens.css", "./src/styles/chrome.css"],
      head,
      sidebar,
      components,
      plugins: [starlightLinksValidator(), ...plugins],
    }),
    sitemap({
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
