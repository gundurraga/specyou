# SpecYou

No one can replace a tasteful person. But a tasteful person can replace themselves.

SpecYou is not about coding standards. It's about documenting _who you are_ - your taste, your instincts, your opinions. The things that make your work _yours_.

When this documentation is structured well - searchable, editable, clear - Claude Code reads it and works exactly as you would. Not generic output. _Your_ output.

This is self-replication. You document once, then multiply. Ten agents, all following your directives. A hundred projects, all in your voice. Your taste, preserved and executable.

---

## Installation

1. Install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=gundurraga.specyou)
2. Add the hook to `~/.claude/settings.json`

## Hook Setup

Every prompt you send, Claude sees your specs. Add this hook to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cat $HOME/.specyou/SPECYOU.md && echo '\n\n---\nTo search specs use: Glob(pattern: **/*.md, path: $HOME/.specyou). Read specs relevant to the current task - this includes recommendations, reviews, exploration, and any task where knowing the users preferences matters. Not just coding.'"
          }
        ]
      }
    ]
  }
}
```

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

## Example Specs

The structure is yours to define. Here are some specs that might exist:

```
coding/naming.md           # Your naming conventions
quality/testing.md         # What and how you test
collaboration/git.md       # Your commit and branch style
app-development/stack.md   # Your preferred technologies
personality/identity.md    # Who you are
personality/aesthetics.md  # What good looks like to you
```

Create what represents you. Delete what doesn't.

## Storage

Specs live locally in `~/.specyou/`. Sync to a GitHub repo (private or public) for backup and portability across machines.

## Updating

To get the latest default SPECYOU.md template, run `SpecYou: Update SPECYOU.md` from the Command Palette.

## Questions?

Open an issue on [GitHub](https://github.com/gundurraga/specyou).

## License

MIT
