# Conventions

House rules for building and maintaining **SupportMail Docs**. Numbered so reviews and commit
messages can cite a rule as §N. Sections are contiguous from §1.

## 1. What this project is (and is not)

This repository is the source of the public SupportMail documentation site at docs.supportmail.dev: Markdown and MDX pages, the Starlight configuration, and the Astro components that illustrate bot behavior (the `src/components/discord/` components draw bot replies as Discord messages). It does not hold the bot, the dashboard, or the API; those live in their own repositories.

## 2. Repository layout

| Path | What belongs there |
| ---- | ------------------ |
| `src/content/docs/` | The pages, grouped in topic folders (`configuration/`, `managing-support/`, `getting-support/`, `guides/`, `troubleshooting/`, `changelogs/`). |
| `src/components/` | Astro components used inside pages and Starlight overrides. |
| `src/config/` | Starlight configuration: sidebar, head, plugins, footer, legacy link map. |
| `src/pages/f/` | The redirect route for legacy `/f/...` links. |
| `src/assets/`, `public/` | Images and static files. |
| `src/styles/`, `src/scripts/` | Styling and client scripts. |
| `scripts/` | Build and content checks (`check-content.mjs`, `prune-drafts.mjs`). |

## 3. Writing voice

Dense, specific, honest. Tables for matrices, prose for reasoning. No marketing language: no superlatives
("seamless", "world-class", "cutting-edge") and no "simply" (if it were simple, the sentence would not need the word). No unexplained
acronyms on first use. American spelling.

## 4. Versioning and releases

[Semantic versioning](https://semver.org/). Every user-facing change lands a CHANGELOG entry
under `[Unreleased]` in the same PR. Cutting a release renames `[Unreleased]` to the dated
version, bumps the version manifest in the same commit, and opens a fresh `[Unreleased]`. Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
(`feat:` / `fix:` / `docs:` / `refactor:` / `test:` / `chore:`).
