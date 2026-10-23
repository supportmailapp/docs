import starlightDocSearch from "@astrojs/starlight-docsearch";
import starlightThemeRapide from "starlight-theme-rapide";
// TODO: add back in once the plugin is fixed to work with Sätteri
// import starlightImageZoomPlugin from "starlight-image-zoom";
import starlightContextualMenu from "starlight-contextual-menu";

export default [
  starlightThemeRapide(),
  starlightContextualMenu({
    actions: ["copy", "view", "chatgpt", "claude", "grok"],
    hideMainActionLabel: true,
    injectMarkdownRoutes: true,
  }),
  starlightDocSearch({
    clientOptionsModule: "./src/config/docsearch.ts",
  }),
];
