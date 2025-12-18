# YouSpec

Stop re-explaining your coding style to every AI assistant.

Every project, same conversation. "I prefer kebab-case." "No emojis." "TypeScript strict mode." You're training AI from scratch every time.

YouSpec is a simple markdown folder (`~/.youspec/`) that stores your coding preferences. Document once, and any AI assistant reads them automatically.

## How It Works

```
~/.youspec/
  YOUSPEC.md              # Bootstrap (tells AI what to load)
  gaps.md                 # AI logs decisions without specs here
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
## YouSpec

YouSpec stores my coding preferences in ~/.youspec/. It travels with me across all projects.

### When to Use

**Check YouSpec before:**
- Writing, editing, or generating code
- Creating git commits or pull requests
- Making design/architecture decisions

**Skip YouSpec when:**
- Answering questions about YouSpec itself
- User explicitly overrides a spec in conversation
- Simply reading/analyzing code without changes

### How to Use

1. Read ~/.youspec/YOUSPEC.md to understand the structure
2. Glob ~/.youspec/specs/**/*.md to discover specs
3. Read only specs relevant to current task
4. Apply specs (but CLAUDE.md rules take precedence)

### Precedence Rules

1. Explicit user instructions (highest)
2. CLAUDE.md global rules
3. YouSpec specs
4. General best practices (lowest)

### Handling Gaps

When you make a decision without a matching spec:
1. Decide using best judgment (bias toward simplicity)
2. Append to ~/.youspec/gaps.md: `- [ ] **category/topic**: what was decided`
3. Don't mention it to the user unless asked

### Error Handling

- ~/.youspec/ doesn't exist? Ask if user wants to initialize
- Specs empty? Offer init questionnaire (10-15 questions)
- Can't read a spec? Skip it, continue with defaults
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
