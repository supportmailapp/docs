// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import starlightThemeRapide from "starlight-theme-rapide";
import starlightImageZoomPlugin from "starlight-image-zoom";
import starlightContextualMenu from "starlight-contextual-menu";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: cloudflare(),
  site: "https://docs.supportmail.dev",
  trailingSlash: "ignore",
  integrations: [
    starlight({
      plugins: [
        starlightThemeRapide(),
        starlightImageZoomPlugin(),
        starlightContextualMenu({
          actions: ["copy", "view", "chatgpt", "claude", "grok"],
          hideMainActionLabel: true,
          injectMarkdownRoutes: true,
        }),
      ],
      title: "SupportMail",
      description: "Documentation for SupportMail, the feature-rich modmail bot for Discord.",
      editLink: {
        baseUrl: "https://github.com/supportmailapp/docs/tree/main",
      },
      pagefind: true,
      logo: {
        src: "/src/assets/logo.png",
        alt: "SupportMail Logo",
        replacesTitle: false,
      },
      credits: true,
      favicon: "/favicon.ico",
      lastUpdated: true,
      customCss: ["./src/styles/custom.css"],
      components: {
        MarkdownContent: "./src/components/overrides/MarkdownContent.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://docs.supportmail.dev/logo.png",
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
            { label: "Getting Started", slug: "getting-started" },
            { label: "Overview", slug: "overview" },
          ],
        },
        {
          label: "Getting Support",
          autogenerate: { directory: "getting-support" },
        },
        {
          label: "Managing Support",
          autogenerate: { directory: "managing-support" },
        },
        {
          label: "Configuration",
          autogenerate: { directory: "configuration" },
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Troubleshooting",
          autogenerate: { directory: "troubleshooting" },
        },
        {
          label: "Changelogs",
          autogenerate: { directory: "changelogs" },
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
});
