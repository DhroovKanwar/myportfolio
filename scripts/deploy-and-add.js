#!/usr/bin/env node
/**
 * Deploy a project to Vercel, then ask whether to add it to this portfolio.
 *
 * Usage (run from inside the project you want to deploy):
 *   node "D:\Projects\React\My Portfolio\scripts\deploy-and-add.js"
 *
 * Skip the deploy step and just add an already-deployed link:
 *   node "...\deploy-and-add.js" --url https://your-project.vercel.app
 *
 * Deploy a project that isn't the current directory:
 *   node "...\deploy-and-add.js" --dir "D:\Projects\some-other-project"
 */

const { spawn } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const readline = require('node:readline/promises')
const { stdin, stdout } = require('node:process')

const PROJECTS_JSON = path.join(__dirname, '..', 'src', 'data', 'projects.json')

const ACCENT_PALETTE = [
  '#F59E0B', '#3B82F6', '#EF4444', '#B5573A', '#8B5CF6',
  '#0EA5E9', '#F97316', '#EC4899', '#1E6640', '#0F7C63', '#6366F1',
]

function parseArgs(argv) {
  const args = { dir: process.cwd() }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--url') args.url = argv[++i]
    else if (argv[i] === '--dir') args.dir = path.resolve(argv[++i])
  }
  return args
}

function runVercelDeploy(dir) {
  return new Promise((resolve, reject) => {
    console.log(`\n▶ Deploying ${dir} to Vercel (production)...\n`)
    const child = spawn('vercel', ['--prod'], {
      cwd: dir,
      shell: true,
      stdio: ['inherit', 'pipe', 'pipe'],
    })

    let output = ''
    child.stdout.on('data', (chunk) => {
      stdout.write(chunk)
      output += chunk.toString()
    })
    child.stderr.on('data', (chunk) => {
      stdout.write(chunk)
      output += chunk.toString()
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`vercel exited with code ${code}`))
        return
      }
      const productionMatch = output.match(/Production:\s*(\S+)/)
      const anyUrlMatch = [...output.matchAll(/https:\/\/\S+\.vercel\.app\S*/g)]
      const url = productionMatch?.[1] ?? anyUrlMatch.at(-1)?.[0]
      resolve(url ? url.replace(/\x1B\[[0-9;]*m/g, '') : null)
    })
  })
}

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function uniqueSlug(base, existing) {
  let slug = base
  let n = 2
  const taken = new Set(existing.map((p) => p.slug))
  while (taken.has(slug)) {
    slug = `${base}-${n++}`
  }
  return slug
}

function splitList(input) {
  return input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

async function promptAddToPortfolio(rl, detectedUrl) {
  const answer = (await rl.question(
    `\nAdd this deployment${detectedUrl ? ` (${detectedUrl})` : ''} to your portfolio? (y/N): `,
  )).trim().toLowerCase()
  return answer === 'y' || answer === 'yes'
}

async function collectProjectDetails(rl, detectedUrl) {
  const currentYear = String(new Date().getFullYear())

  const title = (await rl.question('Title (e.g. "Zafrani Restaurant"): ')).trim()
  const type = (await rl.question('Type/subtitle (e.g. "Indian Restaurant Website"): ')).trim()
  const category = (await rl.question('Category (e.g. "Hospitality"): ')).trim()
  const tag = (await rl.question('Tag (short, e.g. "Restaurant"): ')).trim()
  const year = (await rl.question(`Year [${currentYear}]: `)).trim() || currentYear
  const image = (await rl.question('Card image URL (optional, blank to skip): ')).trim()
  const defaultAccent = ACCENT_PALETTE[Math.floor(Math.random() * ACCENT_PALETTE.length)]
  const accent = (await rl.question(`Accent hex color [${defaultAccent}]: `)).trim() || defaultAccent
  const overview = (await rl.question('One-paragraph overview: ')).trim()
  const features = splitList(await rl.question('Features (comma-separated): '))
  const technologies = splitList(await rl.question('Technologies (comma-separated): '))
  const futureBackend = splitList(
    await rl.question('Future backend ideas (comma-separated, optional): '),
  )
  const liveUrl = (await rl.question(`Live URL [${detectedUrl ?? ''}]: `)).trim() || detectedUrl
  const caseStudyUrl = (await rl.question(`Case study URL [${liveUrl}]: `)).trim() || liveUrl

  return { title, type, category, tag, year, image, accent, overview, features, technologies, futureBackend, liveUrl, caseStudyUrl }
}

function appendProject(details) {
  const existing = JSON.parse(fs.readFileSync(PROJECTS_JSON, 'utf8'))
  const slug = uniqueSlug(slugify(details.title), existing)

  const entry = {
    slug,
    title: details.title,
    type: details.type,
    category: details.category,
    tag: details.tag,
    year: details.year,
    image: details.image,
    accent: details.accent,
    overview: details.overview,
    features: details.features,
    technologies: details.technologies,
    futureBackend: details.futureBackend,
    liveUrl: details.liveUrl,
    caseStudyUrl: details.caseStudyUrl,
  }

  existing.push(entry)
  fs.writeFileSync(PROJECTS_JSON, JSON.stringify(existing, null, 2) + '\n')
  return entry
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  // Deploy first, with vercel's stdio inherited directly from the real TTY.
  // The readline interface is created only after vercel exits, so the two
  // never compete for the same stdin at once.
  let url = args.url ?? null
  if (!url) {
    url = await runVercelDeploy(args.dir)
  }

  const rl = readline.createInterface({ input: stdin, output: stdout })
  try {
    if (!url) {
      console.log('\n⚠ Could not detect the deployed URL from Vercel output.')
      url = (await rl.question('Paste the deployed URL manually (or leave blank to skip adding): ')).trim() || null
    }

    const shouldAdd = await promptAddToPortfolio(rl, url)
    if (!shouldAdd) {
      console.log('Skipped — not added to portfolio.')
      return
    }

    const details = await collectProjectDetails(rl, url)
    const entry = appendProject(details)

    console.log(`\n✓ Added "${entry.title}" (slug: ${entry.slug}) to ${path.relative(process.cwd(), PROJECTS_JSON)}`)
    console.log('  Next: review the entry, then commit/push and redeploy the portfolio for it to go live.')
  } finally {
    rl.close()
  }
}

main().catch((err) => {
  console.error('\n✗', err.message)
  process.exitCode = 1
})
