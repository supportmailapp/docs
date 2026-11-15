import type { StarlightUserConfig } from "@astrojs/starlight/types";

export default [
  {
    icon: "github",
    label: "GitHub",
    href: "https://github.com/orgs/supportmailapp",
  },
  {
    icon: "discord",
    href: "https://help.supportmail.dev/",
    label: "Support Server",
  },
] satisfies StarlightUserConfig["social"];
