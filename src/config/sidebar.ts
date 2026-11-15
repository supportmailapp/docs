import type { StarlightUserConfig } from "@astrojs/starlight/types";

export default [
  {
    label: "Welcome",
    items: [
      { label: "Overview", slug: "overview" },
      { label: "Getting Started", slug: "getting-started" },
      { label: "First Steps", slug: "first-steps" },
      { label: "Help Translate", slug: "help-translate" },
      { label: "About", slug: "about" },
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
  {
    label: "Legal Notice",
    link: "https://legal.supportmail.dev",
  },
] satisfies StarlightUserConfig["sidebar"];
