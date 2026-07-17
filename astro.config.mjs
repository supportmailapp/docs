// @ts-check
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import starlightThemeRapide from "starlight-theme-rapide";
// TODO: add back in once the plugin is fixed to work with Sätteri
// import starlightImageZoomPlugin from "starlight-image-zoom";
import starlightContextualMenu from "starlight-contextual-menu";
import svelte from "@astrojs/svelte";

export default defineConfig({
  output: "static",
  adapter: cloudflare({ imageService: "compile" }),
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
    },
  },
  integrations: [
    svelte({ extensions: [".svelte"] }),
    starlight({
      plugins: [
        starlightThemeRapide(),
        starlightContextualMenu({
          actions: ["copy", "view", "chatgpt", "claude", "grok"],
          hideMainActionLabel: true,
          injectMarkdownRoutes: true,
        }),
      ],
      title: "SupportMail",
      description:
        "Documentation for SupportMail, the feature-rich modmail bot for Discord.",
      editLink: {
        baseUrl: "https://github.com/supportmailapp/docs/tree/main",
      },
      pagefind: true,
      logo: {
        src: "./src/assets/logo.png",
        alt: "SupportMail Logo",
        replacesTitle: false,
      },
      credits: true,
      favicon: "/favicon.ico",
      lastUpdated: true,
      customCss: ["./src/styles/global.css"],
      components: {
        MarkdownContent: "./src/components/overrides/MarkdownContent.astro",
        ThemeSelect: "./src/components/overrides/ThemeSelect.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://new-docs.supportmail.dev/logo.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:card",
            content: "-", // Reset because of SEO issues
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: "#214aff",
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/orgs/supportmailapp",
        },
        {
          icon: "discord",
          href: "https://discord.gg/CkreDcF2PU",
          label: "Support Server",
        },
      ],
      sidebar: [
        {
          label: "Welcome",
          items: [
            { label: "Overview", slug: "overview" },
            { label: "Getting Started", slug: "getting-started" },
          ],
        },
        {
          label: "Getting Support",
          items: [{ autogenerate: { directory: "getting-support" } }],
        },
        {
          label: "Managing Support",
          items: [{ autogenerate: { directory: "managing-support" } }],
        },
        {
          label: "Configuration",
          items: [{ autogenerate: { directory: "configuration" } }],
        },
        {
          label: "Guides",
          items: [{ autogenerate: { directory: "guides" } }],
        },
        {
          label: "Troubleshooting",
          items: [{ autogenerate: { directory: "troubleshooting" } }],
        },
        {
          label: "Changelogs",
          items: [{ autogenerate: { directory: "changelogs" } }],
        },
      ],
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
