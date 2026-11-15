// Types for Starlight's internal virtual modules, which our component overrides
// import so they render other overrides (e.g. Header -> our SiteTitle) instead
// of Starlight's defaults. Starlight resolves these at build time but ships no
// declarations for them, so editors and `astro check` report "Cannot find module".
// Keep this file free of top-level imports/exports: it must stay an ambient
// script for the `declare module` blocks to apply.

declare module "virtual:starlight/components/*" {
  const Component: (props: Record<string, any>) => any;
  export default Component;
}

declare module "virtual:starlight/user-config" {
  const config: import("@astrojs/starlight/types").StarlightConfig;
  export default config;
}

declare module "virtual:starlight/user-images" {
  export const logos: {
    dark?: import("astro").ImageMetadata;
    light?: import("astro").ImageMetadata;
  };
}
