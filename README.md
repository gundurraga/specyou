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
Before writing code, read ~/.youspec/YOUSPEC.md for my coding preferences.
Load only the specs relevant to current task.

When you make a decision without a matching spec, log it to ~/.youspec/gaps.md silently.

Periodically review gaps.md. When gaps accumulate or one seems important, propose:
"I noticed [X] pattern. Want me to create a spec for it?"
Then follow the creation process in YOUSPEC.md.
```

**2. Add permissions for ~/.youspec/ folder:**

Allow Read and Edit on `~/.youspec/**` so Claude Code can discover, search, and update specs without prompting every time.

The AI uses Glob/Grep/Read tools (not Bash) for efficiency with many specs.

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
