# SupportMail Docs

**Public documentation for the SupportMail Discord bot.**

Guides for server admins, moderators and users of SupportMail, covering setup, configuration, handling tickets and reports, and troubleshooting. The site is published at [docs.supportmail.dev](https://docs.supportmail.dev).

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Caveats](#caveats)
- [Contributing](#contributing)
- [License](#license)

## Background

The bot's behavior is configured from a web dashboard and used through Discord commands, so the explanations live apart from the bot's code. This repository holds that documentation as an [Astro](https://astro.build) site using [Starlight](https://starlight.astro.build), with pages written in Markdown and MDX and deployed to Cloudflare Workers.

## Install

Requires Node.js 26+ and pnpm 12 (see `engines` and `packageManager` in `package.json`).

```bash
git clone git@github.com:supportmailapp/docs.git
cd docs
pnpm install
```

## Usage

```bash
pnpm dev            # start the local dev server
pnpm check:content  # run the content rules
pnpm build          # build to ./dist and prune unpublished markdown copies
pnpm preview        # preview the build
```

## Caveats

- Pages marked `draft: true` are not published; `scripts/prune-drafts.mjs` removes the markdown copies that `starlight-contextual-menu` still writes for them, and the build fails if any survive.
- Old `/f/...` links from the bot and dashboard are served by a redirect route, so renaming a page can break a link that lives outside this repository.
- Search needs Algolia credentials (`ALGOLIA_APP_ID` and related variables); without them the search box is not functional locally.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Contributors are expected to follow the
[Code of Conduct](CODE_OF_CONDUCT.md).

## License

Code: [MIT](LICENSE) © SupportMail

Documentation content: [CC BY-NC 4.0](LICENSE-CONTENT.md) © SupportMail
