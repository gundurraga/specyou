# YouSpec

Stop re-explaining your coding style to every AI assistant. Document once, use everywhere.

Every project, same conversation. "I prefer kebab-case." "No emojis." "TypeScript strict mode." You're training AI from scratch every time.

YouSpec is a simple markdown folder (`~/.youspec/`) that stores your coding preferences. Document once, and any AI assistant reads them automatically.

## How It Works

```
~/.youspec/
  YOUSPEC.md              # Instructions for AI assistants
  gaps.md                 # Missing spec topics (not decisions)
  specs/
    coding/               # How you write (naming, functions, errors)
    architecture/         # How you design (organization, dependencies)
    quality/              # How you ensure it works (testing, debugging)
    collaboration/        # How you work with others (git, code-review)
    process/              # How you think (problem-solving, iteration)
    personality/          # Who you are (aesthetics, interests, style)
```

**Writing code?** AI reads `specs/coding/` and `specs/architecture/`.
**Git commit?** AI reads `specs/collaboration/git.md`.
**Creative decision?** AI reads `specs/personality/`.

No more repeating yourself. No more fighting AI defaults.

## Why YouSpec?

| Other tools | YouSpec |
|-------------|---------|
| Project specs (what to build) | Personal preferences (how you code) |
| Per-project setup | Global, portable across all projects |
| Tools and protocols | Just markdown files |
| Neutral on choices | Opinionated, biased toward simplicity |
| Load everything | On-demand (only relevant specs) |

## Installation

Install from VS Code Marketplace (coming soon) or test locally:

```bash
code --extensionDevelopmentPath=/path/to/specyou
```

## Setup for AI Assistants

### 1. Add to your `~/.claude/CLAUDE.md`:

```markdown
# YouSpec - READ FIRST

**BEFORE ANY CODE ACTION**, check ~/.youspec/ for my preferences.

Glob ~/.youspec/specs/**/*.md   # discover what specs exist
Grep "pattern" ~/.youspec/      # search for specific topics

Do this often. My coding DNA lives there. Follow it strictly.

**Which specs to read:**
- Writing code? `specs/coding/`, `specs/architecture/`
- Git commit/PR? `specs/collaboration/git.md`
- Debugging? `specs/quality/`
- Creative decision? `specs/personality/`

**If specs are empty:** Offer init questionnaire (10 questions per topic).

**Missing spec topic?** Log to gaps.md:
- Correct: `- [ ] **quality/testing**: No spec for test coverage`
- Wrong: `- Decided to use 80% coverage because...`

**Creating specs:** Ask 10 questions first. Use USER's words, not your assumptions.
```

### 2. Add permissions for `~/.youspec/`:

Allow Read and Edit on `~/.youspec/**` so AI can discover, search, and update specs without prompting.

## Philosophy

Principles for picking coding standards:

1. **Simplicity over cleverness** - Can a junior dev understand it in 30 seconds?
2. **Clarity over brevity** - Better to be explicit than save keystrokes
3. **Convention over configuration** - Use language defaults when possible
4. **Boring over novel** - Proven patterns beat clever innovations
5. **Delete over preserve** - Dead code rots. Comments lie. Remove ruthlessly.

### When Principles Conflict

Principles guide, but vision wins:

1. **Does it work?** (correctness beats elegance)
2. **Does it match the vision?** (right complexity beats wrong simplicity)
3. **Can it be maintained?** (future you beats present you)
4. **Is it simple?** (only after 1-3 are satisfied)

## Features

- Sidebar to browse/edit your specs
- Create, rename, delete specs and folders
- Copy spec content to clipboard
- Works alongside Claude Code, Cursor, any AI that reads files

## License

MIT
