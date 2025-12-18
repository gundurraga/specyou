# YouSpec

**Your digital twin. Your coding DNA. Portable across any AI.**

Document who you are as a developer - naming, patterns, preferences, personality - and every AI coding assistant knows how to work with you.

## What is this?

YouSpec is YOUR identity, not project specs. It's your digital twin that travels with you across all projects - simple HTML page or complex game, same you.

- **Personal, not project:** Lives in `~/.youspec/`, not in repos
- **Digital twin:** Coding style + personality + aesthetics + preferences
- **Portable:** Works with Claude Code, Cursor, Codex, Gemini, whatever comes next
- **On-demand:** AI only loads specs relevant to current task
- **Opinionated:** Always biased toward simplicity
- **Yours forever:** Local markdown files, no cloud, no sync

## Installation

Install from VS Code Marketplace (coming soon) or test locally:

```bash
code --extensionDevelopmentPath=/path/to/specyou
```

## How It Works

### For You (Human)
- Sidebar to browse/edit your specs
- Create, rename, delete specs and folders
- Copy spec content to clipboard

### For AI (Claude Code, etc.)

**1. Add to your `~/.claude/CLAUDE.md`:**

```markdown
## YouSpec
YouSpec is my digital twin - my coding DNA, preferences, personality. Not project specs.
It lives in ~/.youspec/ and travels with me across all projects.

**ALWAYS read relevant specs before any action:**
- Writing code? Read coding/, architecture/
- Git commit/PR? Read collaboration/git.md
- Debugging? Read quality/
- Any creative decision? Read personality/

Use Glob to discover, Grep to search, Read to load.

**If specs folders are empty:** Offer to run init questionnaire (10-15 questions) to create starter specs.

**While working:** When you make a decision without a matching spec, log it to gaps.md silently.

**Periodically:** Review gaps.md and propose creating specs for important patterns.
```

**2. Add permissions for ~/.youspec/ folder:**

Allow Read and Edit on `~/.youspec/**` so Claude Code can discover, search, and update specs without prompting every time.

## Structure

```
~/.youspec/
  YOUSPEC.md              # Bootstrap (tells AI what to load)
  gaps.md                 # AI logs missing specs here
  specs/
    coding/               # How you write (naming, functions, errors)
    architecture/         # How you design (organization, dependencies)
    quality/              # How you ensure it works (testing, debugging)
    collaboration/        # How you work with others (git, code-review)
    process/              # How you think (problem-solving, iteration)
    personality/          # Who you are (aesthetics, interests, style)
```

## Philosophy

1. **Simplicity over cleverness** - Can a junior dev understand it in 30 seconds?
2. **Clarity over brevity** - Better to be explicit than save keystrokes
3. **Convention over configuration** - Use language defaults when possible
4. **Boring over novel** - Proven patterns beat clever innovations

## License

MIT
