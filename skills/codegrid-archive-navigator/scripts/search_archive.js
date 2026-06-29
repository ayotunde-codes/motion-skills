#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const args = { query: "", limit: 10, channel: "", manifest: "", json: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--query" || arg === "-q") args.query = argv[++i] || "";
    else if (arg === "--limit" || arg === "-n") args.limit = Number(argv[++i] || 10);
    else if (arg === "--channel" || arg === "-c") args.channel = argv[++i] || "";
    else if (arg === "--manifest" || arg === "-m") args.manifest = argv[++i] || "";
    else if (arg === "--json") args.json = true;
    else if (!args.query) args.query = arg;
    else args.query += ` ${arg}`;
  }
  return args;
}

function findManifest(startDir) {
  let dir = path.resolve(startDir);
  while (true) {
    const candidate = path.join(dir, "discord-archive", "manifest.json");
    if (fs.existsSync(candidate)) return candidate;
    const direct = path.join(dir, "manifest.json");
    if (fs.existsSync(direct)) return direct;
    const parent = path.dirname(dir);
    if (parent === dir) return "";
    dir = parent;
  }
}

function normalize(value) {
  return String(value || "").toLowerCase();
}

function tokenize(value) {
  return normalize(value)
    .replace(/[^a-z0-9.+#-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function scoreMessage(msg, terms) {
  const haystack = normalize([
    msg.channelName,
    msg.title,
    msg.content,
    msg.text,
    ...(msg.files || []).map((file) => file.filename),
    ...(msg.externalLinks || []),
    ...(msg.youtubeLinks || []),
  ].flat().join(" "));

  let score = 0;
  for (const term of terms) {
    if (haystack.includes(term)) score += 3;
    for (const token of tokenize(haystack)) {
      if (token === term) score += 2;
      else if (token.includes(term) || term.includes(token)) score += 0.25;
    }
  }

  const title = normalize(msg.title);
  for (const term of terms) if (title.includes(term)) score += 4;
  if ((msg.files || []).some((file) => /\.zip$/i.test(file.filename))) score += 1;
  return score;
}

function inferLocalFolder(manifestPath, msg) {
  const archiveDir = path.dirname(manifestPath);
  const filesDir = path.join(archiveDir, "files");
  if (!fs.existsSync(filesDir)) return "";
  const safe = (value) => String(value || "untitled")
    .replace(/[\\/:*?"<>|#%&{}$!'@+=`]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120) || "untitled";
  const date = (msg.datetime || "").slice(0, 10) || "unknown-date";
  const folder = path.join(filesDir, safe(msg.channelName), safe(`${date} ${msg.title}`));
  return fs.existsSync(folder) ? folder : "";
}

const args = parseArgs(process.argv);
const manifestPath = args.manifest || findManifest(process.cwd());
if (!manifestPath) {
  console.error("No manifest found. Pass --manifest /path/to/manifest.json");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const terms = tokenize(args.query);
const rows = (manifest.messages || [])
  .filter((msg) => !args.channel || normalize(msg.channelName).includes(normalize(args.channel)))
  .map((msg) => ({
    score: terms.length ? scoreMessage(msg, terms) : 1,
    date: (msg.datetime || "").slice(0, 10),
    channel: msg.channelName,
    title: msg.title,
    files: (msg.files || []).map((file) => file.filename),
    youtubeLinks: msg.youtubeLinks || [],
    externalLinks: msg.externalLinks || [],
    messageUrl: msg.serverId && msg.channelId && msg.messageId
      ? `https://discord.com/channels/${msg.serverId}/${msg.channelId}/${msg.messageId}`
      : "",
    localFolder: inferLocalFolder(manifestPath, msg),
  }))
  .filter((row) => row.score > 0)
  .sort((a, b) => b.score - a.score || String(b.date).localeCompare(String(a.date)))
  .slice(0, args.limit);

if (args.json) {
  console.log(JSON.stringify({ manifest: manifestPath, query: args.query, results: rows }, null, 2));
} else {
  console.log(`Manifest: ${manifestPath}`);
  console.log(`Query: ${args.query || "(all)"}`);
  console.log("");
  rows.forEach((row, index) => {
    console.log(`${index + 1}. ${row.title}`);
    console.log(`   ${row.date || "unknown date"} | ${row.channel} | score ${row.score.toFixed(2)}`);
    if (row.localFolder) console.log(`   folder: ${row.localFolder}`);
    if (row.files.length) console.log(`   files: ${row.files.join(", ")}`);
    if (row.youtubeLinks.length) console.log(`   youtube: ${row.youtubeLinks.join(" ")}`);
  });
}

