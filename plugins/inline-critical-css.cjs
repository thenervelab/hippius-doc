// plugins/inline-critical-css.cjs
const Critters = require("critters");
const fs = require("node:fs/promises");
const fsSync = require("node:fs");
const path = require("node:path");

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveHtmlFile(outDir, routePath) {
  // Clean leading slash for path.join
  const clean = routePath.startsWith("/") ? routePath.slice(1) : routePath;

  // 1) Special root route: "", "/"
  if (clean === "") {
    const rootIdx = path.join(outDir, "index.html");
    return (await pathExists(rootIdx)) ? rootIdx : null;
  }

  // 2) Candidate path
  let candidate = path.join(outDir, clean);

  // If it's an explicit .html, use it
  if (candidate.endsWith(".html")) {
    return (await pathExists(candidate)) ? candidate : null;
  }

  // If it's a directory, or not .html, try index.html inside it
  try {
    if (fsSync.statSync(candidate).isDirectory()) {
      candidate = path.join(candidate, "index.html");
    }
  } catch {
    // Not a directory or does not exist; fall back to index.html next to it
    candidate = path.join(candidate, "index.html");
  }

  return (await pathExists(candidate)) ? candidate : null;
}

module.exports = function inlineCriticalCss() {
  return {
    name: "inline-critical-css",
    async postBuild({ outDir, routesPaths }) {
      const critters = new Critters({
        path: outDir,
        preload: "swap",
        pruneSource: false,
        inlineFonts: false,
        reduceInlineStyles: true,
        pruneSource: true,
      });

      const files = (
        await Promise.all(routesPaths.map((r) => resolveHtmlFile(outDir, r)))
      ).filter(Boolean); // drop nulls

      // Process only real HTML files
      await Promise.all(
        files.map(async (file) => {
          const html = await fs.readFile(file, "utf8");
          const processed = await critters.process(html);
          await fs.writeFile(file, processed);
        })
      );
    },
  };
};
