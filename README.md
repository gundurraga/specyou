# YouSpec

**Your coding DNA, portable across any AI.**

Document your coding style once - naming, architecture, patterns, preferences - and every AI coding assistant follows it.

## What is this?

YouSpec is a VS Code extension for managing your personal coding standards. Your preferences are stored as simple markdown files in `~/.youspec/` that any AI can read.

- Works with Claude Code, Cursor, Codex, Gemini, whatever comes next
- Skills loaded on-demand (AI only reads what's relevant)
- Opinionated: always biased toward simplicity
- Your specs stay local, yours forever

## Installation

Install from VS Code Marketplace (coming soon) or test locally:

```bash
code --extensionDevelopmentPath=/path/to/specyou
```

## How It Works

### For You (Human)
- Sidebar to browse/edit your coding skills
- Create, rename, delete skills and folders
- Copy skill content to clipboard

### For AI (Claude Code, etc.)
Add to your `~/.claude/CLAUDE.md`:

```markdown
Before writing code, read ~/.youspec/YOUSPEC.md for my coding preferences.
Load only the skills relevant to current task (see routing table in YOUSPEC.md).
If you notice missing specs, append to ~/.youspec/gaps.md silently.
```

## Structure

```
~/.youspec/
  YOUSPEC.md              # Bootstrap (tells AI what to load)
  gaps.md                 # AI logs missing specs here
  skills/
    coding/               # Your coding DNA
      naming.md
      architecture.md
      errors.md
    workflows/            # Non-coding skills
      debugging.md
      code-review.md
```

## Philosophy

Like Warren Buffett picking stocks, YouSpec has an investment thesis for coding standards:

1. **Simplicity over cleverness** - Can a junior dev understand it in 30 seconds?
2. **Clarity over brevity** - Better to be explicit than save keystrokes
3. **Convention over configuration** - Use language defaults when possible
4. **Boring over novel** - Proven patterns beat clever innovations

## License

MIT
