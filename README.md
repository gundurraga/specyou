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
    coding/               # How you write
    architecture/         # How you design
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

**Creating specs:** Ask 10 questions first. Use MY words, not your assumptions.
```

Grant read/edit permissions on `~/.specyou/**`.

## Principles

How to pick standards worth documenting:

1. **Simplicity over cleverness** - Can someone understand it in 30 seconds?
2. **Clarity over brevity** - Explicit beats terse
3. **Convention over configuration** - Defaults exist for a reason
4. **Boring over novel** - Proven patterns beat clever innovations
5. **Delete over preserve** - Dead code rots

When principles conflict: correctness first, then vision, then maintainability, then simplicity.

## Installation

VS Code extension (coming soon). For now:

```bash
code --extensionDevelopmentPath=/path/to/specyou
```

## License

MIT
