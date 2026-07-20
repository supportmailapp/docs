import type { DocSearchClientOptions } from "@astrojs/starlight-docsearch";
import {
  ALGOLIA_APP_ID,
  ALGOLIA_INDEX_NAME,
  ALGOLIA_SEARCH_API_KEY,
} from "astro:env/client";

export default {
  appId: ALGOLIA_APP_ID!,
  apiKey: ALGOLIA_SEARCH_API_KEY!,
  indexName: ALGOLIA_INDEX_NAME!,
  getMissingResultsUrl() {
    return `https://help.supportmail.dev/`;
  },
} satisfies DocSearchClientOptions;
