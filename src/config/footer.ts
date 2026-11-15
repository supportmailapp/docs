import { PUBLIC_DASHBOARD_URL } from "astro:env/client";

export interface FooterLink {
  label: string;
  href: string;
}

/** Links shown in the row at the bottom of every docs page. */
export const footerLinks: FooterLink[] = [
  { label: "Homepage", href: "https://supportmail.dev" },
  { label: "Dashboard", href: PUBLIC_DASHBOARD_URL ?? "https://dash.supportmail.dev" },
  { label: "Support server", href: "https://help.supportmail.dev/" },
  { label: "Status", href: "https://status.supportmail.dev/" },
  { label: "Translate (Thoth)", href: "https://thoth.supportmail.dev" },
  { label: "Legal", href: "https://legal.supportmail.dev" },
];
