#!/usr/bin/env node
// ── TAOS Generate-Site Script ─────────────────────────────────────────────────
//
// Clones a Trescon event template, injects the event config, downloads brand
// assets, and outputs a ready-to-run Next.js project.
//
// Usage:
//   node generate-site.mjs --template template-2-vault2047 --name my-event-name
//   node generate-site.mjs --template template-1-finance2045 --name finance-mena-2027 --event-id abc123 --api-url https://taos.trescon.com --token <session-token>
//
// Options:
//   --template   Required. Template ID (template-1-finance2045 | template-2-vault2047 | template-3-world-cx-summit | template-4-world-ai-show | template-5-big-cio-show)
//   --name       Required. Output folder name (e.g. world-ai-show-dubai-2027)
//   --output     Optional. Parent directory to create the project in. Default: ~/my-events/
//   --event-id   Optional. TAOS event ID — auto-fetches event.ts config from TAOS
//   --api-url    Optional. TAOS base URL (e.g. https://taos.trescon.com). Required if --event-id given
//   --token      Optional. Session token for TAOS API auth. Required if --event-id given
//   --config     Optional. Path to a pre-generated event.ts file to inject directly
//   --port       Optional. Dev server port. Default: 3000
// ─────────────────────────────────────────────────────────────────────────────

import fs   from 'fs'
import path from 'path'
import { execSync, spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import https from 'https'
import http  from 'http'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Parse args ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const get = (flag) => {
  const i = args.indexOf(flag)
  return i !== -1 && args[i + 1] ? args[i + 1] : null
}

const templateId  = get('--template')
const projectName = get('--name')
const outputBase  = get('--output') || path.join(process.env.HOME, 'my-events')
const eventId     = get('--event-id')
const apiUrl      = get('--api-url')
const token       = get('--token')
const configPath  = get('--config')
const port        = get('--port') || '3000'

// ── Validate ─────────────────────────────────────────────────────────────────
const VALID_TEMPLATES = [
  'template-1-finance2045',
  'template-2-vault2047',
  'template-3-world-cx-summit',
  'template-4-world-ai-show',
  'template-5-big-cio-show',
]

if (!templateId || !projectName) {
  console.error('\nUsage: node generate-site.mjs --template <id> --name <project-name> [options]\n')
  console.error('Templates:', VALID_TEMPLATES.join('\n         '))
  process.exit(1)
}

if (!VALID_TEMPLATES.includes(templateId)) {
  console.error(`Unknown template: ${templateId}`)
  console.error('Valid:', VALID_TEMPLATES.join(', '))
  process.exit(1)
}

const templateSrc = path.join(__dirname, templateId)
const outputDir   = path.join(outputBase, projectName)

if (!fs.existsSync(templateSrc)) {
  console.error(`Template not found at: ${templateSrc}`)
  console.error('Make sure you are running this from ~/taos-templates/')
  process.exit(1)
}

if (fs.existsSync(outputDir)) {
  console.error(`Output directory already exists: ${outputDir}`)
  console.error('Choose a different --name or delete the existing folder.')
  process.exit(1)
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function step(n, msg) {
  console.log(`\n[${n}] ${msg}`)
}

function ok(msg)   { console.log(`    ✓  ${msg}`) }
function info(msg) { console.log(`    →  ${msg}`) }
function warn(msg) { console.log(`    ⚠  ${msg}`) }

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (!url || !url.startsWith('http')) { resolve(false); return }
    const lib = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(destPath)
    lib.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        fs.unlinkSync(destPath)
        downloadFile(res.headers.location, destPath).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) { file.close(); resolve(false); return }
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve(true) })
    }).on('error', () => { file.close(); resolve(false) })
  })
}

async function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const lib     = url.startsWith('https') ? https : http
    const parsed  = new URL(url)
    const reqOpts = {
      hostname: parsed.hostname,
      port:     parsed.port || (url.startsWith('https') ? 443 : 80),
      path:     parsed.pathname + parsed.search,
      method:   options.method || 'GET',
      headers:  { 'Content-Type': 'application/json', ...(options.headers || {}) },
    }
    const req = lib.request(reqOpts, (res) => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) })
        } catch { resolve({ status: res.statusCode, data: body }) }
      })
    })
    req.on('error', reject)
    if (options.body) req.write(options.body)
    req.end()
  })
}

// ── Step 1: Copy template ─────────────────────────────────────────────────────
step(1, `Cloning ${templateId} → ${outputDir}`)
fs.mkdirSync(outputBase, { recursive: true })

// Use cp -r to clone the template (fast, preserves permissions)
execSync(`cp -r "${templateSrc}" "${outputDir}"`, { stdio: 'inherit' })
ok(`Project created at ${outputDir}`)

// Remove .git if present (start fresh)
const gitDir = path.join(outputDir, '.git')
if (fs.existsSync(gitDir)) {
  execSync(`rm -rf "${gitDir}"`)
  ok('Removed .git — fresh repo')
}

// ── Step 2: Fetch event.ts config ─────────────────────────────────────────────
step(2, 'Fetching event config')

let configContent = null

if (configPath) {
  // Load from local file
  if (!fs.existsSync(configPath)) {
    console.error(`Config file not found: ${configPath}`)
    process.exit(1)
  }
  configContent = fs.readFileSync(configPath, 'utf8')
  ok(`Loaded config from ${configPath}`)

} else if (eventId && apiUrl) {
  // Fetch from TAOS API
  info(`Calling TAOS API: ${apiUrl}/api/templates/generate`)
  try {
    const cookieHeader = token ? `tcs_session=${token}` : ''
    const res = await fetchJson(`${apiUrl}/api/templates/generate`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', ...(cookieHeader ? { Cookie: cookieHeader } : {}) },
      body:    JSON.stringify({ event_id: eventId, template_id: templateId }),
    })
    if (res.status !== 200 || !res.data.config_ts) {
      console.error('TAOS API error:', res.data?.error || 'Unknown error')
      console.error('Status:', res.status)
      warn('Continuing with existing event.ts config in template')
    } else {
      configContent = res.data.config_ts
      ok('Config fetched from TAOS successfully')

      // Also store asset URLs for download in step 3
      if (res.data.event?.assets) {
        process.env._TAOS_ASSETS = JSON.stringify(res.data.event.assets)
      }
    }
  } catch (e) {
    warn(`Could not reach TAOS API: ${e.message}`)
    warn('Continuing with existing event.ts config in template')
  }

} else {
  info('No --event-id or --config provided — keeping template\'s existing event.ts')
  info('You can edit it manually at: src/config/event.ts')
}

// Write the config if we have one
if (configContent) {
  const configDest = path.join(outputDir, 'src', 'config', 'event.ts')
  fs.mkdirSync(path.dirname(configDest), { recursive: true })
  fs.writeFileSync(configDest, configContent, 'utf8')
  ok('event.ts written to src/config/event.ts')
}

// ── Step 3: Download brand assets ─────────────────────────────────────────────
step(3, 'Downloading brand assets')

const publicDir = path.join(outputDir, 'public')
fs.mkdirSync(publicDir, { recursive: true })

// Read the event.ts config to extract asset URLs
const eventTsPath = path.join(outputDir, 'src', 'config', 'event.ts')
const eventTsContent = fs.existsSync(eventTsPath) ? fs.readFileSync(eventTsPath, 'utf8') : ''

// Extract asset URLs from event.ts using regex (fast, no need to execute TS)
function extractAsset(content, key) {
  const match = content.match(new RegExp(`${key}:\\s*["'\`]([^"'\`]+)["'\`]`))
  return match ? match[1] : null
}

const assetMap = {
  'logo.svg':         extractAsset(eventTsContent, 'logo'),
  'logo-white.svg':   extractAsset(eventTsContent, 'logo_white'),
  'hero-poster.jpg':  extractAsset(eventTsContent, 'hero_poster'),
  'hero-bg.webm':     extractAsset(eventTsContent, 'hero_video'),
}

// Also check TAOS assets from API response
let taoAssets = {}
try {
  if (process.env._TAOS_ASSETS) taoAssets = JSON.parse(process.env._TAOS_ASSETS)
} catch {}

// Merge
if (taoAssets.logo)       assetMap['logo.svg']        = taoAssets.logo
if (taoAssets.logo_white) assetMap['logo-white.svg']  = taoAssets.logo_white
if (taoAssets.hero_image) assetMap['hero-poster.jpg'] = taoAssets.hero_image
if (taoAssets.hero_video) assetMap['hero-bg.webm']    = taoAssets.hero_video

let downloaded = 0
for (const [filename, url] of Object.entries(assetMap)) {
  if (!url || url.startsWith('/')) {
    info(`${filename} — local path, skipping download`)
    continue
  }
  const ext      = path.extname(url.split('?')[0]) || path.extname(filename)
  const destName = path.basename(filename, path.extname(filename)) + ext
  const destPath = path.join(publicDir, destName)
  info(`Downloading ${filename} from ${url.slice(0, 60)}…`)
  const success = await downloadFile(url, destPath)
  if (success) { ok(`Saved → public/${destName}`); downloaded++ }
  else         { warn(`Could not download ${filename} — add it manually to /public/`) }
}

if (downloaded === 0) {
  warn('No remote assets downloaded. Add your logo and hero image manually to /public/')
}

// ── Step 4: Update wrangler.jsonc if present ──────────────────────────────────
step(4, 'Updating Cloudflare config')

const wranglerPath = path.join(outputDir, 'wrangler.jsonc')
if (fs.existsSync(wranglerPath)) {
  let wrangler = fs.readFileSync(wranglerPath, 'utf8')
  // Replace the "name" field with the project name (safe for CF Workers naming)
  const cfName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').slice(0, 63)
  wrangler = wrangler.replace(/"name":\s*"[^"]+"/, `"name": "${cfName}"`)
  fs.writeFileSync(wranglerPath, wrangler, 'utf8')
  ok(`Cloudflare worker name set to: ${cfName}`)
} else {
  info('No wrangler.jsonc found — add one if deploying to Cloudflare')
}

// ── Step 5: Update package.json dev port ─────────────────────────────────────
if (port !== '3000') {
  const pkgPath = path.join(outputDir, 'package.json')
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
    if (pkg.scripts?.dev) {
      pkg.scripts.dev = `next dev --port ${port}`
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
      ok(`Dev port set to ${port}`)
    }
  }
}

// ── Step 6: Git init ──────────────────────────────────────────────────────────
step(5, 'Initialising git')
try {
  execSync(`git -C "${outputDir}" init -q && git -C "${outputDir}" add -A && git -C "${outputDir}" commit -q -m "init: generated from ${templateId} via TAOS"`)
  ok('Git repo initialised with initial commit')
} catch {
  warn('Could not init git — do it manually if needed')
}

// ── Step 6: Install dependencies ──────────────────────────────────────────────
step(6, 'Installing dependencies (npm install)')
info('This takes ~60 seconds…')
const install = spawnSync('npm', ['install'], { cwd: outputDir, stdio: 'inherit' })
if (install.status !== 0) {
  warn('npm install failed — run it manually inside the project folder')
} else {
  ok('Dependencies installed')
}

// ── Done ──────────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(60))
console.log('  Site generated successfully!')
console.log('─'.repeat(60))
console.log(`\n  Project:   ${outputDir}`)
console.log(`  Template:  ${templateId}`)
console.log('\n  Next steps:\n')
console.log(`  1. Edit brand/content:`)
console.log(`     code "${outputDir}"`)
console.log(`     → Edit src/config/event.ts for all event details`)
console.log(`     → Add logo to public/logo.svg`)
console.log(`     → Add hero video/image to public/`)
console.log(`\n  2. Preview locally:`)
console.log(`     cd "${outputDir}" && npm run dev`)
console.log(`\n  3. Deploy to Cloudflare:`)
console.log(`     npm run build`)
console.log(`     npx wrangler deploy`)
console.log('\n' + '─'.repeat(60) + '\n')
