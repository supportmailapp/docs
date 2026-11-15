import starlightDocSearch from "@astrojs/starlight-docsearch";
// TODO: starlight-image-zoom 0.16 supports Sätteri; decide whether to replace src/scripts/imageLightbox.js with it
// import starlightImageZoomPlugin from "starlight-image-zoom";
import starlightContextualMenu from "starlight-contextual-menu";

export default [
  starlightContextualMenu({
    actions: ["copy", "view", "chatgpt", "claude", "grok"],
    hideMainActionLabel: true,
    injectMarkdownRoutes: true,
  }),
  starlightDocSearch({
    clientOptionsModule: "./src/config/docsearch.ts",
  }),
];
