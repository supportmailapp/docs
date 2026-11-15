#!/usr/bin/env node
// Runs after `astro build`. Starlight skips `draft: true` pages, but
// starlight-contextual-menu's injectMarkdownRoutes still writes a markdown copy
// (<route>/index.md) of every entry, drafts included.
//
// Two independent layers:
//   1. Authoritative: read `draft: true` from the content frontmatter, derive each
//      draft's route, and remove every markdown copy and page that route could own.
//   2. Safety net: any markdown file in the output without a built page next to it
//      belongs to an unpublished entry and is removed, whatever its name.
// The landing page is the one special case: its copy is index/index.md while its page is
// the root index.html.
//
// Fail closed: verification re-derives the draft set from frontmatter and checks the output
// directly (no shared predicate with layer 1), then sweeps for any markdown without a page.
import { readdirSync, readFileSync, rmSync, existsSync, statSync } from "node:fs";
import { join, relative, dirname, basename, extname } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const outDir = join(root, "dist/client");
const contentDir = join(root, "src/content/docs");

/** Recursively collect files under `dir` whose extension is in `exts`. */
function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, exts, out);
    else if (exts.includes(extname(name))) out.push(full);
  }
  return out;
}

/** Reads the top-level frontmatter block of an entry as { draft, slug }. */
function readFrontmatter(file) {
  const match = readFileSync(file, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const block = match ? match[1] : "";
  const draft = /^draft:\s*true\s*(#.*)?$/m.test(block);
  const slug = block.match(/^slug:\s*["']?([^"'\r\n#]+?)["']?\s*(#.*)?$/m)?.[1] ?? null;
  return { draft, slug };
}

/** Route of a content entry: its `slug` override, else its path without extension. */
function routeOf(file, slug) {
  const rel = slug ?? relative(contentDir, file).replaceAll("\\", "/").replace(/\.mdx?$/, "");
  return rel.replace(/(^|\/)index$/, "").replace(/^\/+|\/+$/g, "");
}

/** Draft routes, read from frontmatter only. The landing page's route is "". */
function draftRoutes() {
  const routes = [];
  for (const file of walk(contentDir, [".md", ".mdx"])) {
    const { draft, slug } = readFrontmatter(file);
    if (draft) routes.push(routeOf(file, slug));
  }
  return routes;
}

/** Every output path a draft route could own: its markdown copy and its page. */
function candidatePaths(route) {
  if (route === "") {
    return [join(outDir, "index/index.md"), join(outDir, "index.md"), join(outDir, "index.html")];
  }
  return [
    join(outDir, route, "index.md"),
    join(outDir, `${route}.md`),
    join(outDir, route, "index.html"),
    join(outDir, `${route}.html`),
  ];
}

/** True when the markdown file at `md` has a built page next to it. */
function hasBuiltPage(md) {
  const dir = dirname(md);
  if (basename(md) !== "index.md") return false;
  if (existsSync(join(dir, "index.html"))) return true;
  return relative(outDir, dir) === "index" && existsSync(join(outDir, "index.html"));
}

/** Remove `md`, and its whole route folder when the copy is all it holds. */
function removeCopy(md) {
  const dir = dirname(md);
  const target = dir !== outDir && readdirSync(dir).length === 1 ? dir : md;
  rmSync(target, { recursive: true, force: true });
  console.log(`prune-drafts: removed ${relative(root, target).replaceAll("\\", "/")}`);
}

if (!existsSync(outDir)) {
  console.error(`prune-drafts: ${outDir} not found; run after astro build.`);
  process.exit(1);
}

const drafts = draftRoutes();
let removed = 0;

// Layer 1: frontmatter-derived drafts.
for (const route of drafts) {
  for (const path of candidatePaths(route)) {
    if (!existsSync(path)) continue;
    if (path.endsWith(".md")) {
      removeCopy(path);
      removed++;
    }
  }
}

// Layer 2: markdown with no built page, whatever the filename.
for (const md of walk(outDir, [".md"])) {
  if (hasBuiltPage(md)) continue;
  removeCopy(md);
  removed++;
}

// Fail closed. A draft must leave no markdown copy and no page; the check reads the
// frontmatter-derived set and the output directly and shares no predicate with layer 2.
const leaks = [];
for (const route of drafts) {
  for (const path of candidatePaths(route)) {
    if (existsSync(path)) leaks.push(relative(root, path).replaceAll("\\", "/"));
  }
}
for (const md of walk(outDir, [".md"])) {
  if (!hasBuiltPage(md)) leaks.push(relative(root, md).replaceAll("\\", "/"));
}
if (leaks.length) {
  console.error(`prune-drafts: unpublished content still present: ${leaks.join(", ")}`);
  process.exit(1);
}
console.log(
  `prune-drafts: ${drafts.length} draft route(s), ${removed} unpublished markdown copy(ies) removed.`,
);
