#!/usr/bin/env node
// Runs after `astro build`. Starlight skips `draft: true` pages, but
// starlight-contextual-menu's injectMarkdownRoutes still writes a markdown copy
// (<slug>/index.md) of every entry, drafts included. Remove any build output
// for draft pages so dev-only pages never ship.
import { readdirSync, readFileSync, rmSync, existsSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const contentDir = join(root, "src/content/docs");
const outDirs = [join(root, "dist/client"), join(root, "dist")];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if ([".md", ".mdx"].includes(extname(name))) out.push(full);
  }
  return out;
}

const drafts = walk(contentDir)
  .filter((file) => {
    const fm = readFileSync(file, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
    // YAML 1.2 booleans: true, True, TRUE (what Astro's schema accepts as true).
    return fm && /^draft:\s*(true|True|TRUE)\s*(#.*)?$/m.test(fm[1]);
  })
  .map((file) => relative(contentDir, file).replaceAll("\\", "/").replace(/\.(md|mdx)$/, "").replace(/(^|\/)index$/, ""));

let removed = 0;
for (const slug of drafts) {
  for (const out of outDirs) {
    for (const target of [join(out, slug), join(out, `${slug}.md`), join(out, `${slug}.html`)]) {
      if (existsSync(target)) {
        rmSync(target, { recursive: true, force: true });
        removed++;
        console.log(`prune-drafts: removed ${relative(root, target).replaceAll("\\", "/")}`);
      }
    }
  }
}
console.log(`prune-drafts: ${drafts.length} draft page(s), ${removed} output path(s) removed.`);

// Fail closed: no draft output may survive.
const leftovers = drafts.flatMap((slug) =>
  outDirs.flatMap((out) => [join(out, slug), join(out, `${slug}.md`), join(out, `${slug}.html`)]).filter((t) => existsSync(t)),
);
if (leftovers.length) {
  console.error(`prune-drafts: draft output still present: ${leftovers.join(", ")}`);
  process.exit(1);
}
