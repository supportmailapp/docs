/**
 * Old docs URLs (`/f/...`) that the bot and dashboard used to link to, mapped to
 * current pages. Keys are paths below `/f/`; `hashes` maps an old `#fragment` to
 * a more specific target. Served by `src/pages/f/[...path].astro`.
 */
export interface LegacyRoute {
  to: string;
  hashes?: Record<string, string>;
}

const contacting = "/getting-support/contacting-support/";
const ticketConfig = "/configuration/ticket-system-config/";
const reportsConfig = "/configuration/reports-configuration/";

const ticketsHashes = {
  "what-is-the-modmail-concept": "/overview/#modmail",
  "create-ticket": contacting,
  "multiple-servers": `${contacting}#with-a-command`,
  "interact-with-tickets": "/managing-support/handling-tickets/",
  "anonym-settings": `${ticketConfig}#anonymity`,
  "configuration-options": ticketConfig,
  "configuration-explanations": ticketConfig,
};

const reportsHashes = {
  "what-are-reports": "/overview/#reports",
  "how-to-report-someone-or-some-message": "/overview/#reports",
  "configuration-options": reportsConfig,
  "alert-channel": `${reportsConfig}#turning-reports-on`,
  "report-limits": `${reportsConfig}#limits`,
  "report-actions": "/managing-support/managing-reports/#acting-on-a-report",
};

const debugHashes = {
  "check-role-integrity": "/guides/commands/#check-role-integrity",
  "check-user-integrity": "/guides/commands/#check-user-integrity",
  "check-channel-setup": "/guides/commands/#check-channel-setup",
  "check-permissions": "/guides/commands/#check-permissions",
};

export const legacyRoutes: Record<string, LegacyRoute> = {
  tickets: { to: "/overview/#modmail", hashes: ticketsHashes },
  "tickets/anonymous": { to: `${ticketConfig}#anonymity` },
  "tickets/configuration": { to: ticketConfig },
  "tickets/create-ticket": { to: contacting },
  "tickets/interact-with-tickets": { to: "/managing-support/handling-tickets/" },
  "tickets/multiple-servers": { to: `${contacting}#with-a-command` },
  "tickets/setup": { to: "/configuration/setup-wizard/" },
  reports: { to: "/overview/#reports", hashes: reportsHashes },
  "reports/configuration": { to: reportsConfig },
  "reports/setup": { to: "/configuration/setup-wizard/" },
  debugging: { to: "/guides/commands/#debug", hashes: debugHashes },
};
