import type { DocSearchClientOptions } from "@astrojs/starlight-docsearch";
import { getSecret } from "astro:env/server";

export default {
  appId: getSecret("ALGOLIA_APP_ID")!,
  apiKey: getSecret("ALGOLIA_SEARCH_API_KEY")!,
  indexName: getSecret("ALGOLIA_INDEX_NAME")!,
  getMissingResultsUrl() {
    return `https://help.supportmail.dev/`;
  },
} satisfies DocSearchClientOptions;
