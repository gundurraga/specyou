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

Add a hook to `~/.claude/settings.json` that automatically injects your specs:

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

This injects your `SPECYOU.md` instructions on every prompt. Claude reads relevant specs automatically - no permission prompts, no manual setup per project.

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
