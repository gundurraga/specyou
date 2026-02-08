# specyou

Replicate yourself.

AI writes generic code. It follows best practices, not your practices.

specyou fixes that. Document your taste, opinions, and instincts once. Claude Code reads them on every prompt.

Ten agents coding like you. A hundred projects in your voice.

No one can replace a tasteful person. But a tasteful person can replace themselves.

## What you can document

```
~/.specyou/
  specs/
    coding/               # Naming, patterns, error handling, language preferences
    collaboration/        # Git workflow, documentation style, PR conventions
    personality/          # Copywriting voice, aesthetics, worldview
    philosophy/           # Decision-making, marketing approach, growth principles
    app-development/      # Stack choices, auth, onboarding, paywalls, ASO
    infrastructure/       # Hosting, deployment, CI/CD preferences
```

Everything is markdown. Portable. Readable. Editable by hand.

## Setup

1. Install the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=gundurraga.specyou)
2. Add the hook to `~/.claude/settings.json`:

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

3. Write specs about how you work

## License

MIT
