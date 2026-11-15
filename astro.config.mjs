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
  // Old URLs still linked from the bot, the dashboard and past messages.
  // `/f/...` links are handled by src/pages/f/[...path].astro (they carry #fragments).
  redirects: {
    "/home": "/",
    "/guides/formats": "/guides/emoji-markdown/",
    "/guides/formats/emojis": "/guides/emoji-markdown/",
    "/version-2.1/misc/markdown-guide": "/guides/emoji-markdown/",
  },
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
      expressiveCode: {
        styleOverrides: {
          borderRadius: "8px",
          borderColor: "var(--sm-line)",
          codeFontFamily: "var(--sm-font-mono)",
          uiFontFamily: "var(--sm-font-body)",
          codeBackground: "var(--sm-surface-1)",
          frames: {
            editorTabBarBackground: "var(--sm-surface-2)",
            editorActiveTabBackground: "var(--sm-surface-1)",
            terminalTitlebarBackground: "var(--sm-surface-2)",
            terminalBackground: "var(--sm-surface-1)",
            frameBoxShadowCssValue: "none",
          },
        },
      },
      customCss: ["./src/styles/global.css", "./src/styles/tokens.css", "./src/styles/chrome.css", "./src/styles/content.css"],
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
