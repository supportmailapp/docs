#!/usr/bin/env node
// Content checks for the docs. Exit 0 = clean, exit 1 = at least one violation.
// Usage: node scripts/check-content.mjs [--theme]
//   --theme  also enforce the "Rapide removed" rule (on by default once Rapide is gone)
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const args = new Set(process.argv.slice(2));
const themeRule = args.has("--theme");

/** Directories to walk, with the file extensions scanned in each. */
const targets = [
  { dir: "src/content/docs", exts: [".md", ".mdx"] },
  { dir: "src/components", exts: [".astro"] },
];

const rules = [
  // Built from code points so this file never contains the characters it bans.
  { re: new RegExp(`[${String.fromCharCode(0x2014, 0x2015)}]`), msg: "dash character" },
  { re: /close-time/, msg: "option is close-in" },
  { re: /discord\.gg\/gv8jupwGtA/, msg: "use https://help.supportmail.dev/" },
  { re: /SupportMail Gold|Diamond/, msg: "plan name not public" },
];
if (themeRule) rules.push({ re: /rapide/i, msg: "Rapide removed" });

function walk(dir, exts, out) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, exts, out);
    else if (exts.includes(extname(name))) out.push(full);
  }
  return out;
}

const files = targets.flatMap(({ dir, exts }) => walk(join(root, dir), exts, []));

let failures = 0;
for (const file of files) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const { re, msg } of rules) {
      if (re.test(line)) {
        failures++;
        console.log(`${relative(root, file).replaceAll("\\", "/")}:${i + 1}: ${msg}`);
      }
    }
  });
}

if (failures) {
  console.log(`\n${failures} content issue(s) in ${files.length} files.`);
  process.exit(1);
}
console.log(`check:content OK (${files.length} files).`);
