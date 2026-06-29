#!/usr/bin/env node
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const script = path.join(__dirname, "search_archive.ts");
const result = spawnSync(process.execPath, [script, ...process.argv.slice(2)], {
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
