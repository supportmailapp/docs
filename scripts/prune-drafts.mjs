#!/usr/bin/env node
// Runs after `astro build`. Starlight skips `draft: true` pages, but
// starlight-contextual-menu's injectMarkdownRoutes still writes a markdown copy
// (<route>/index.md) of every entry, drafts included.
//
// Rule, based only on the build output (no frontmatter parsing, no slug
// guessing): every published page has an index.html, so a markdown copy whose
// page was not built belongs to an unpublished entry and is removed.
// The landing page is the one special case: its copy is index/index.md while
// its page is the root index.html.
import { readdirSync, rmSync, existsSync, statSync } from "node:fs";
import { join, relative, dirname, basename } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const outDir = join(root, "dist/client");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".md")) out.push(full);
  }
  return out;
}

/** True when the markdown copy at `md` has a built page next to it. */
function isPublished(md) {
  const dir = dirname(md);
  if (basename(md) !== "index.md") return true; // not a route copy; leave it alone
  if (existsSync(join(dir, "index.html"))) return true;
  return relative(outDir, dir) === "index" && existsSync(join(outDir, "index.html"));
}

if (!existsSync(outDir)) {
  console.error(`prune-drafts: ${outDir} not found; run after astro build.`);
  process.exit(1);
}

const orphans = walk(outDir).filter((md) => !isPublished(md));
for (const md of orphans) {
  const dir = dirname(md);
  // Remove the whole route folder when the copy is all it holds.
  const target = readdirSync(dir).length === 1 ? dir : md;
  rmSync(target, { recursive: true, force: true });
  console.log(`prune-drafts: removed ${relative(root, target).replaceAll("\\", "/")}`);
}

// Fail closed: re-scan and stop the build if any unpublished copy survived.
const left = walk(outDir).filter((md) => !isPublished(md));
if (left.length) {
  console.error(`prune-drafts: unpublished markdown still present: ${left.join(", ")}`);
  process.exit(1);
}
console.log(`prune-drafts: ${orphans.length} unpublished markdown copy(ies) removed.`);
