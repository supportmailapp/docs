# Contributing

Thanks for considering a contribution to **SupportMail Docs**. The essentials are below; the full
house rules live in [`CONVENTIONS.md`](CONVENTIONS.md).

## Prerequisites

- **Node.js 26+ and pnpm 12.** The site itself needs both (`engines` and `packageManager` in `package.json`).

## What a good change looks like

- **Keep the changeset complete.** A change updates any affected docs (README,
  CONVENTIONS) in the **same** PR. Docs are part of the change, not a follow-up.
- **Check the content before you push.** Run `pnpm check:content` for the content rules and `pnpm build` for the full site build, which also runs the Starlight links validator.

## Pull requests

- Branch off `main`; PRs target `main`.
- **Conventional commits** (`feat:` / `fix:` / `docs:` / `refactor:` / `test:` / `chore:`).
- Describe what you changed and why, and confirm `pnpm build` passes.

By contributing you agree your code is licensed under the repository's
[MIT](LICENSE) license and your documentation content under
[CC BY-NC-SA 4.0](LICENSE-CONTENT.md), and you agree to the
[Code of Conduct](CODE_OF_CONDUCT.md).
