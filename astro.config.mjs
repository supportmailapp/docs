// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

import docsearch from "@astrojs/starlight-docsearch";
import sitemap from "@astrojs/sitemap";
import catppuccin from "@catppuccin/starlight";
import starlightImageZoomPlugin from "starlight-image-zoom";
import starlightLinksValidator from "starlight-links-validator";
import starlightGitHubAlerts from "starlight-github-alerts";
import starlightContextualMenu from "starlight-contextual-menu";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.supportmail.dev",
  trailingSlash: "ignore",
  integrations: [
    starlight({
      plugins: [
        catppuccin({
          dark: { accent: "peach", flavor: "mocha" },
          light: { accent: "peach", flavor: "latte" },
        }),
        docsearch({
          clientOptionsModule: "./src/config/docsearch.ts",
        }),
        starlightImageZoomPlugin(),
        starlightLinksValidator(),
        starlightGitHubAlerts(),
        starlightContextualMenu({
          actions: ["copy", "view", "chatgpt", "claude", "grok"],
          hideMainActionLabel: true,
          injectMarkdownRoutes: true,
        }),
      ],
      title: "SupportMail Docs",
      description: "The ultimate ticketing bot for Discord.",
      logo: {
        src: "./public/logo.png",
        alt: "SupportMail Logo",
        replacesTitle: false,
      },
      credits: true,
      favicon: "/logo.png",
      tableOfContents: { minHeadingLevel: 1, maxHeadingLevel: 3 },
      editLink: {
        baseUrl: "https://github.com/supportmailapp/docs/tree/main",
      },
      lastUpdated: true,
      customCss: ["./src/styles/global.css"],
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://supportmail.dev/favicon.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "algolia-site-verification",
            content: "834A6D588263731A",
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
            content: "#21aaff",
          },
        },
      ],
      sidebar: [
        {
          label: "Welcome",
          items: [
            { label: "Getting Started", link: "/getting-started" },
            { label: "About SupportMail", link: "/about" },
            // { label: "Unlimited", link: "/unlimited" },
            { label: "All Features", link: "/features" },
          ],
        },
        {
          label: "Commands",
          autogenerate: { directory: "commands" },
        },
        // {
        //   label: "Dashboard",
        //   autogenerate: { directory: "dashboard" },
        // },
        {
          label: "Features",
          autogenerate: { directory: "features" },
        },
        // {
        //   label: "Guides",
        //   autogenerate: { directory: "guides" },
        // },
        {
          label: "Troubleshooting",
          autogenerate: { directory: "troubleshooting" },
        },
        {
          label: "Changelogs",
          collapsed: true,
          // items: [{ label: "2025", link: "/changelogs/2025" }],
          autogenerate: { directory: "changelogs" },
        },
      ],
      components: {
        Header: "./src/components/overrides/Header.astro",
        MarkdownContent: "./src/components/overrides/MarkdownContent.astro",
      },
      social: [
        {
          icon: "discord",
          href: "https://discord.gg/CkreDcF2PU",
          label: "Support Server",
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
