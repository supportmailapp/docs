import type { StarlightUserConfig } from "@astrojs/starlight/types";

const overrides = "./src/components/overrides";

export default {
  MarkdownContent: `${overrides}/MarkdownContent.astro`,
  ThemeSelect: `${overrides}/ThemeSelect.astro`,
} satisfies StarlightUserConfig["components"];
