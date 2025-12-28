import type { DocSearchClientOptions } from "@astrojs/starlight-docsearch";

export default {
  appId: "0LIG2QCV78",
  apiKey: "4cf16b22627f803f4e0ef6b5af179bc2",
  indexName: "SupportMail Docs v1",
  maxResultsPerGroup: 25,
  disableUserPersonalization: false,
  getMissingResultsUrl({ query }) {
    return `https://github.com/supportmail/docs/issues/new?title=${query}`;
  },
} satisfies DocSearchClientOptions;
