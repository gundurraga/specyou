#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const os = require('os')

const SPECYOU_DIR = path.join(os.homedir(), '.specyou')
const SPECS_DIR = path.join(SPECYOU_DIR, 'specs')
const CLAUDE_SETTINGS_PATH = path.join(os.homedir(), '.claude', 'settings.json')
const TEMPLATES_DIR = path.join(__dirname, 'templates')

const HOOK_COMMAND = `cat $HOME/.specyou/SPECYOU.md && echo '\\n\\n---\\nTo search specs use: Glob(pattern: **/*.md, path: $HOME/.specyou). Read specs relevant to the current task - this includes recommendations, reviews, exploration, and any task where knowing the users preferences matters. Not just coding.'`

function readTemplate(filename) {
  return fs.readFileSync(path.join(TEMPLATES_DIR, filename), 'utf8')
}

const DEFAULT_FOLDERS = [
  'coding',
  'collaboration',
  'personality',
  'philosophy',
  'app-development',
  'infrastructure'
]

function log(message) {
  console.log(message)
}

function logDone(message) {
  console.log(`  + ${message}`)
}

function logSkip(message) {
  console.log(`  - ${message} (already exists)`)
}

function createSpecyouDirectory() {
  if (!fs.existsSync(SPECYOU_DIR)) {
    fs.mkdirSync(SPECYOU_DIR, { recursive: true })
    logDone('Created ~/.specyou/')
  } else {
    logSkip('~/.specyou/')
  }

  for (const folder of DEFAULT_FOLDERS) {
    const folderPath = path.join(SPECS_DIR, folder)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
      logDone(`Created specs/${folder}/`)
    }
  }

  const specyouPath = path.join(SPECYOU_DIR, 'SPECYOU.md')
  if (!fs.existsSync(specyouPath)) {
    fs.writeFileSync(specyouPath, readTemplate('specyou-default.md'), 'utf8')
    logDone('Created SPECYOU.md')
  } else {
    logSkip('SPECYOU.md')
  }
}

function configureHook() {
  const claudeDir = path.dirname(CLAUDE_SETTINGS_PATH)
  if (!fs.existsSync(claudeDir)) {
    fs.mkdirSync(claudeDir, { recursive: true })
  }

  let settings = {}
  if (fs.existsSync(CLAUDE_SETTINGS_PATH)) {
    try {
      settings = JSON.parse(fs.readFileSync(CLAUDE_SETTINGS_PATH, 'utf8'))
    } catch {
      log('\n  Warning: Could not parse ~/.claude/settings.json. Creating backup.')
      fs.copyFileSync(CLAUDE_SETTINGS_PATH, `${CLAUDE_SETTINGS_PATH}.backup`)
      settings = {}
    }
  }

  if (!settings.hooks) {
    settings.hooks = {}
  }

  if (!settings.hooks.UserPromptSubmit) {
    settings.hooks.UserPromptSubmit = []
  }

  const hookEntry = {
    hooks: [
      {
        type: 'command',
        command: HOOK_COMMAND
      }
    ]
  }

  const alreadyConfigured = settings.hooks.UserPromptSubmit.some(entry =>
    entry.hooks?.some(hook => hook.command?.includes('.specyou/SPECYOU.md'))
  )

  if (alreadyConfigured) {
    logSkip('Claude Code hook')
    return
  }

  settings.hooks.UserPromptSubmit.push(hookEntry)
  fs.writeFileSync(CLAUDE_SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf8')
  logDone('Added hook to ~/.claude/settings.json')
}

async function init() {
  log('\nspecyou init\n')

  createSpecyouDirectory()
  log('')
  configureHook()

  log('\nDone. Open Claude Code and start writing specs.\n')
  log('Next steps:')
  log('  1. Write specs in ~/.specyou/specs/ (plain markdown)')
  log('  2. Every Claude Code prompt now reads your preferences')
  log('  3. Tell Claude: "ask me 10 questions about how I name variables"')
  log('     and it will create a spec for you\n')
}

function showHelp() {
  log(`
specyou - Replicate yourself.

Usage:
  specyou init    Set up ~/.specyou/ and configure Claude Code hook

That's it. Write markdown specs, Claude reads them on every prompt.

Learn more: https://github.com/gundurraga/specyou
`)
}

const command = process.argv[2]

if (command === 'init') {
  init()
} else {
  showHelp()
}
