# specyou

**No one can replace a tasteful person. But a tasteful person can replace themselves.**

Every AI session starts from zero. It doesn't know how you name things, when you'd abstract, or what "good" means to you, so it hands you the average of everyone. Generic work, dressed as "best practices."

specyou fixes that. You write your preferences down once, in plain markdown, and your AI reads them on every prompt. Your judgment lives in a file now, instead of in your head, retyped every session.

---

**Without specyou:**

> "Add a way to delete your account"
>
> The AI builds a settings page with a sidebar, a confirmation modal, a soft-delete that keeps the data for 30 days, an email notification, and a background job to purge it later. Forty minutes reviewing code you never asked for.

**With specyou:**

> Same prompt. The AI already read your specs. It knows you ship the simplest version first. It knows you hard-delete because you don't keep user data you don't need. One button, one action, done.

**This isn't only for code.** Anything you'd otherwise retype every session, your product calls, your voice, your design instincts, the standards you refuse to drop below, lives in a spec instead.

> "Handle the error when payment fails" comes back as "Your card was declined, try a different one," not "Oops, something went wrong," because your spec says: tell people exactly what happened and what to do next.
>
> "Write the launch email" arrives in your cadence, short sentences, no hype, because your spec describes how you actually sound.
>
> "Draft the pricing section" doesn't sprout a comparison table and a "Contact Sales" button, because your spec says you sell one thing at one price and complexity is indecision.

## "I'll set this up once and never touch it again"

Probably the first thing you thought, and it's the fair objection. The whole point is your taste, and taste is the part you can't easily put into words. That's what makes it taste.

So you don't write specs by hand. You get interviewed.

```
> "Ask me 10 questions about how I handle errors"
> "Help me put my product instincts into words"
> "Interview me about my writing voice"
```

The AI asks, you answer, it saves the spec in your own words. Edit if you want. The best specs come out of being questioned, not from staring at a blank file.

## Install

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=gundurraga.specyou)

Free. MIT licensed. On first run it creates `~/.specyou/` with a few starter folders and wires into Claude Code, so every prompt begins with your preferences loaded. After that the structure is yours. Rename folders, delete them, reshape it however you think. specyou won't fight you or put anything back.

A sidebar panel lets you browse, search, and manage your specs.

## What a spec looks like

```markdown
# Error Handling

## Core Principle
Errors are communication. The person should always know what happened
and what to do next. Never a generic "Something went wrong."

## For AI
- Auto-fix: replace generic error messages with specific ones
- Auto-fix: use toast notifications, never alert()
- Ask first: custom error types, they can change the interface
- Never: swallow an error silently
```

The "For AI" section is where a preference becomes an instruction: what to fix silently, what to ask about first, what to never touch. That's the difference between a note to yourself and something an AI can act on.

## How it works

Your specs are just markdown files. **`SPECYOU.md` is what makes the AI actually read them.**

It's a short system prompt loaded on every prompt through a Claude Code [hook](https://docs.anthropic.com/en/docs/claude-code/hooks). In plain terms, it tells the AI: before you do anything, go read this person's specs and work the way they work.

```
~/.specyou/
  SPECYOU.md         # the system prompt that ties it together
  specs/
    coding/          # naming, patterns, error handling
    personality/     # voice, tone, taste
    philosophy/      # how you decide, what you value
    ...              # whatever categories fit how you think
```

Plain markdown. Portable. Version it with git, sync it across machines, read it yourself. It's yours, not locked inside one tool's memory feature.

## Why this exists

Most AI personalization stays shallow: "be concise," "use TypeScript." specyou is for the deeper layer, the calls you make without thinking. When to abstract and when to inline. What you refuse to ship. How you sound. How you decide when two good options pull in opposite directions.

That's taste, and taste is usually trapped in one head, re-explained from scratch every session. Write it down once, and every session comes back the way you'd have done it.

<details>
<summary>Manual setup (without the extension)</summary>

1. Create `~/.specyou/specs/` and add markdown files.
2. Add the hook to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cat $HOME/.specyou/SPECYOU.md && echo '\\n\\n---\\nTo search specs use: Glob(pattern: **/*.md, path: $HOME/.specyou). Read specs relevant to the current task, not just coding.'"
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
