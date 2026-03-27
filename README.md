# specyou

AI writes generic code. It follows "best practices," not *your* practices.

specyou fixes that. Document your preferences in markdown. Claude Code reads them on every prompt.

---

**Without specyou:**

> "Add a way to delete your account"
>
> Claude builds a settings page with a sidebar, a confirmation modal, a soft-delete that retains data for 30 days, an email notification, and a background job to purge later. Forty minutes reviewing code you didn't ask for.

**With specyou:**

> Same prompt. Claude already read your specs. It knows you ship the simplest version first. It knows you hard-delete because you don't want user data you don't need. One button. One action. Done.

**It's not just code.** Your specs cover product decisions, voice, design instincts -- everything you'd normally repeat in every prompt:

> "Build the pricing page" -- Claude doesn't add a comparison table and a "Contact Sales" button. It knows you sell one plan at one price because complex pricing is indecision.
>
> "Handle the error when payment fails" -- Claude doesn't write "Oops! Something went wrong." It writes "Your card was declined. Try a different card." Because your spec says: tell the user exactly what happened and what to do next.
>
> "Set up auth" -- Claude doesn't scaffold NextAuth with GitHub, Google, email, and magic links. It sets up email and password. Your spec says: one method, add more when users ask.

---

## Install

[Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=gundurraga.specyou)

The extension creates `~/.specyou/` with default spec folders and hooks into Claude Code automatically. Every prompt now starts with your preferences loaded.

Sidebar panel to browse, search, and manage specs visually.

You don't write specs by hand. You have a conversation:

```
> "Ask me 10 questions about how I handle errors"
> "Document my opinions on onboarding"
> "I want to spec out how I think about product decisions"
```

Claude asks, you answer, it saves the spec in your words. Edit if needed. Done.

## What a spec looks like

```markdown
# Error Handling

## Core Principle
Errors are communication. The user should always know what happened
and what to do next. Never show a generic "Something went wrong."

## For AI
- Auto-fix: Replace try/catch wrappers with early returns
- Auto-fix: Use toast notifications, never alert()
- Ask first: Custom error types (might change the interface contract)
- Never: Swallow errors silently. Never catch without handling.
```

The "For AI" section is the key part. You're not just documenting preferences -- you're telling Claude what to fix silently, what to ask about, and what to never touch.

## How it works

```
~/.specyou/
  SPECYOU.md              # Auto-generated system prompt
  specs/
    coding/               # Naming, patterns, error handling
    personality/          # Voice, tone, aesthetics
    philosophy/           # Decision-making, product principles
    app-development/      # Stack, auth, monetization
    ...                   # Your categories, your rules
```

Plain markdown. Portable. Version-controllable. Claude Code reads them via a [hook](https://docs.anthropic.com/en/docs/claude-code/hooks) and searches for relevant specs on every prompt.

## Why this matters

No one can replace a tasteful person. But a tasteful person can replace themselves.

Most AI personalization is shallow -- "be concise" or "use TypeScript." specyou captures the decisions you make instinctively: when to abstract, how to name things, what "good code" means to you, how you think about products, what your voice sounds like. Not rules. Taste.

<details>
<summary>Manual setup (without the extension)</summary>

1. Create `~/.specyou/specs/` and add markdown files
2. Add the hook to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cat $HOME/.specyou/SPECYOU.md && echo '\\n\\n---\\nTo search specs use: Glob(pattern: **/*.md, path: $HOME/.specyou). Read specs relevant to the current task - this includes recommendations, reviews, exploration, and any task where knowing the users preferences matters. Not just coding.'"
          }
        ]
      }
    ]
  }
}
```

</details>

## License

MIT
