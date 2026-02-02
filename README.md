# specyou

Replicate yourself.

![specyou sidebar](screenshot.png)

## The Problem

AI writes generic code. It follows best practices, not your practices. It produces output that works but doesn't feel like yours.

## The Solution

Document who you are. Once.

Your taste. Your opinions. Your instincts. Written in markdown, read by Claude Code on every prompt.

Ten agents coding like you. A hundred projects in your voice.

No one can replace a tasteful person. But a tasteful person can replace themselves.

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

## Structure

```
~/.specyou/
  SPECYOU.md              # System prompt for AI
  gaps.md                 # Topics to document later
  specs/
    coding/               # How you write code
    quality/              # How you test
    collaboration/        # How you work with others
    personality/          # Who you are
```

Portable. Readable. Editable by hand.

## Updating

Run `specyou: Update SPECYOU.md` from the Command Palette to get the latest template.

## License

MIT

## Questions

[GitHub](https://github.com/gundurraga/specyou)
