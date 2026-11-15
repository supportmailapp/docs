import type { StarlightUserConfig } from "@astrojs/starlight/types";

export default [
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
      content: "#0b3b78", // blueprint oklch(0.36 0.115 257)
    },
  },
  {
    tag: "meta",
    attrs: {
      name: "algolia-site-verification",
      content: "834A6D588263731A",
    },
  },
] satisfies StarlightUserConfig["head"];
