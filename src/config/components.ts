import type { StarlightUserConfig } from "@astrojs/starlight/types";

const overrides = "./src/components/overrides";

export default {
  MarkdownContent: `${overrides}/MarkdownContent.astro`,
  ThemeSelect: `${overrides}/ThemeSelect.astro`,
  ThemeProvider: `${overrides}/ThemeProvider.astro`,
  Header: `${overrides}/Header.astro`,
  SiteTitle: `${overrides}/SiteTitle.astro`,
  PageTitle: `${overrides}/PageTitle.astro`,
  Pagination: `${overrides}/Pagination.astro`,
  Footer: `${overrides}/Footer.astro`,
} satisfies StarlightUserConfig["components"];
