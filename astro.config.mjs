// @ts-check
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";

import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import starlightThemeRapide from "starlight-theme-rapide";
import starlightImageZoomPlugin from "starlight-image-zoom";
import starlightContextualMenu from "starlight-contextual-menu";
import starlightSidebarSwipe from "starlight-sidebar-swipe";
// import starlightSiteGraph from "starlight-site-graph";

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
        starlightImageZoomPlugin(),
        starlightContextualMenu({
          actions: ["copy", "view", "chatgpt", "claude", "grok"],
          hideMainActionLabel: true,
          injectMarkdownRoutes: true,
        }),
        starlightSidebarSwipe(),
        // starlightSiteGraph(),
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
      customCss: ["./src/styles/global.css"],
      components: {
        Header: "./src/components/overrides/Header.astro",
        Sidebar: "./src/components/overrides/Sidebar.astro",
        MobileMenuFooter: "./src/components/overrides/MobileMenuFooter.astro",
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
        // {
        //   label: "Troubleshooting",
        //   autogenerate: { directory: "troubleshooting" },
        // },
        {
          label: "Changelogs",
          autogenerate: { directory: "changelogs" },
          collapsed: true,
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
    // optimizeDeps: {
    //   include: ["picomatch", "micromatch", "anymatch"],
    //   esbuildOptions: {
    //     define: {
    //       "process.platform": '"linux"',
    //     },
    //   },
    // },
  },
});
