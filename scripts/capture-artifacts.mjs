#!/usr/bin/env node
/**
 * scripts/capture-artifacts.mjs
 *
 * Starts playground-app (or reuses PLAYGROUND_URL), captures Playwright
 * screenshots, and generates a repository structure tree.
 *
 * Usage:
 *   node scripts/capture-artifacts.mjs
 *   PLAYGROUND_URL=http://localhost:5173 node scripts/capture-artifacts.mjs
 */

import { execSync, spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { chromium } from 'playwright';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SCREENSHOTS_DIR = join(ROOT, 'docs', 'screenshots');

const TREE_IGNORE_DIRS = new Set(['.git', 'dist', 'node_modules', 'screenshots', 'storybook-static']);
const TREE_IGNORE_FILES = new Set(['.DS_Store']);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

async function findFreePort(start = 5200) {
  return new Promise((resolve) => {
    const server = createServer();
    server.listen(start, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', () => resolve(findFreePort(start + 1)));
  });
}

async function waitForUrl(url, timeout = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok || res.status < 500) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timeout waiting for ${url}`);
}

function buildTree(dir, prefix = '') {
  const entries = readdirSync(dir).filter(
    (e) => !TREE_IGNORE_DIRS.has(e) && !TREE_IGNORE_FILES.has(e)
  );
  let lines = [];
  entries.forEach((entry, i) => {
    const isLast = i === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const childPrefix = isLast ? '    ' : '│   ';
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    lines.push(`${prefix}${connector}${entry}`);
    if (stat.isDirectory()) {
      lines = lines.concat(buildTree(fullPath, prefix + childPrefix));
    }
  });
  return lines;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

let viteProcess = null;

try {
  ensureDir(SCREENSHOTS_DIR);
  ensureDir(join(ROOT, 'docs'));

  // 1. Start or reuse playground-app
  let playgroundUrl = process.env.PLAYGROUND_URL;
  if (!playgroundUrl) {
    const port = await findFreePort(5200);
    playgroundUrl = `http://localhost:${port}`;
    console.log(`Starting playground-app on ${playgroundUrl}...`);
    viteProcess = spawn('npm', ['run', 'dev', '--', '--port', String(port)], {
      cwd: join(ROOT, 'hub'),
      stdio: 'pipe',
      shell: true
    });
    await waitForUrl(playgroundUrl);
    console.log('playground-app is ready.');
  } else {
    console.log(`Reusing PLAYGROUND_URL: ${playgroundUrl}`);
  }

  // 2. Launch Playwright
  const browser = await chromium.launch();

  async function capture(name, setup) {
    const page = await browser.newPage();
    await page.goto(playgroundUrl, { waitUntil: 'networkidle' });
    if (setup) await setup(page);
    const outPath = join(SCREENSHOTS_DIR, `${name}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`  Captured: ${relative(ROOT, outPath)}`);
    await page.close();
  }

  // 3. Hub screenshot
  console.log('Capturing hub screenshot...');
  await capture('playground-hub', async (page) => {
    await page.waitForSelector('[aria-label="Decision Intelligence Prototype Hub"]');
  });

  // 4. Detail screenshot — click first Details button if present
  console.log('Capturing detail screenshot...');
  await capture('playground-detail-frontend', async (page) => {
    await page.waitForSelector('[aria-label="Decision Intelligence Prototype Hub"]');
    const detailBtn = page.getByRole('button', { name: /Details/i }).first();
    const exists = await detailBtn.count();
    if (exists > 0) {
      await detailBtn.click();
      await page.waitForTimeout(800);
    }
  });

  // 5. Backend-selected screenshot
  console.log('Capturing backend-selected screenshot...');
  await capture('playground-backend-selected', async (page) => {
    await page.waitForSelector('[aria-label="Decision Intelligence Prototype Hub"]');
    const backendLink = page.getByRole('link', { name: /backend/i }).first();
    const exists = await backendLink.count();
    if (exists > 0) {
      await backendLink.click();
      await page.waitForTimeout(800);
    }
  });

  // 6. Mobile hub + detail
  console.log('Capturing mobile screenshots...');
  await capture('playground-mobile-hub', async (page) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(playgroundUrl, { waitUntil: 'networkidle' });
  });

  await capture('playground-mobile-detail', async (page) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(playgroundUrl, { waitUntil: 'networkidle' });
    const detailBtn = page.getByRole('button', { name: /Details/i }).first();
    const exists = await detailBtn.count();
    if (exists > 0) {
      await detailBtn.click();
      await page.waitForTimeout(800);
    }
  });

  await browser.close();

  // 7. Repository tree
  console.log('Generating repository tree...');
  const treeLines = [`di-prototype-platform/`, ...buildTree(ROOT)];
  const treeText = treeLines.join('\n');
  writeFileSync(join(ROOT, 'docs', 'repository-structure.txt'), treeText + '\n');
  console.log('  Saved: docs/repository-structure.txt');

  // Simple SVG tree diagram
  const svgLines = treeLines.slice(0, 50); // cap for readability
  const svgHeight = svgLines.length * 18 + 40;
  const svgContent = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="${svgHeight}" font-family="IBM Plex Mono, monospace" font-size="13">`,
    `<rect width="700" height="${svgHeight}" fill="#f4f4f4"/>`,
    ...svgLines.map((line, i) => {
      const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<text x="20" y="${30 + i * 18}" fill="#161616">${escaped}</text>`;
    }),
    '</svg>'
  ].join('\n');
  writeFileSync(join(ROOT, 'docs', 'repository-structure.svg'), svgContent);
  console.log('  Saved: docs/repository-structure.svg');

  console.log('\n✓ All artifacts captured successfully.');
} finally {
  if (viteProcess) {
    viteProcess.kill();
  }
}
