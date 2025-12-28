# SpecYou

No one can replace a tasteful person. But a tasteful person can replace themselves.

SpecYou is not about coding standards. It's about documenting *who you are* as a programmer - your taste, your instincts, your opinions. The things that make your code *yours*.

When this documentation is structured well - searchable, editable, clear - tools like Claude Code can read it, understand it, and write software exactly as you would. Not generic code. *Your* code.

This is self-replication. You document once, then multiply. Ten agents, all following your directives. A hundred projects, all in your voice. Your taste, preserved and executable.

The specs aren't rules for AI to follow. They're a portrait of how you think. The closer that portrait, the more indistinguishable the output becomes from your own work.

---

## Structure

A folder of markdown files. Nothing more.

```
~/.specyou/
  SPECYOU.md              # Bootstrap instructions (system prompt for AI)
  gaps.md                 # Missing topics to document
  specs/
    app-development/      # How you build apps
    coding/               # How you write code
    quality/              # How you ensure it works
    collaboration/        # How you work with others
    process/              # How you think
    personality/          # Who you are
```

Portable across projects. Readable by any tool. Editable by hand.

## Usage

Add this to `~/.claude/CLAUDE.md` (or equivalent for your AI tool):

```markdown
# SpecYou - READ FIRST

**Before writing code, check ~/.specyou/.** Your instructions are there.

ls -la ~/.specyou/
grep "topic" ~/.specyou/

The more you check, the better you understand my taste. Read them, search them, internalize them. Then write code as I would.

**If specs are empty:** Offer init questionnaire (10 questions per topic).

**Missing spec topic?** Log to gaps.md:
- Correct: `- [ ] **quality/testing**: No spec for test coverage`
- Wrong: `- Decided to use 80% coverage because...`

**Creating specs:** Ask 10 questions first. Then follow-up questions to clarify doubts. Use MY words, not your assumptions.
```

## Example Specs

The structure is yours to define. Here are some specs that might exist:

```
coding/naming.md           # Your naming conventions
quality/testing.md         # What and how you test
collaboration/git.md       # Your commit and branch style
app-development/stack.md   # Your preferred technologies
personality/identity.md    # Who you are as a programmer
personality/aesthetics.md  # What good looks like to you
```

Create what represents you. Delete what doesn't.

## Storage

Specs live locally in `~/.specyou/`. Use git if you want backup or versioning.

## Installation

Search for "SpecYou" in the VS Code Extensions marketplace, or:

```bash
code --install-extension gundurraga.specyou
```

## License

MIT
