# specyou

AI writes generic code. It follows "best practices," not *your* practices.

specyou fixes that. Document your taste once. Claude Code reads it on every prompt.

```
npx specyou init
```

That's it. One command. Takes 10 seconds.

## What it does

specyou creates `~/.specyou/`, a folder of markdown files that describe how *you* work. It hooks into Claude Code so every prompt starts with your preferences loaded.

**Without specyou:**
> "Add a button to delete the user account"
>
> Claude writes generic React with `handleClick`, `isLoading`, `try/catch`, default error handling. It works. It looks like everyone else's code.

**With specyou:**
> Same prompt. But Claude read your specs first. It knows you prefer early returns over try/catch. It knows you name booleans as questions (`isDeleting`, not `deleteLoading`). It knows your app uses a specific toast pattern for errors. The code looks like *you* wrote it.

## How it works

```
~/.specyou/
  SPECYOU.md              # System prompt (auto-generated)
  specs/
    coding/               # Naming, patterns, error handling
    personality/          # Voice, aesthetics, tone
    philosophy/           # Decision-making, growth principles
    app-development/      # Stack, auth, monetization
    ...                   # Your categories, your rules
```

Everything is plain markdown. Portable. Version-controllable. Editable by hand.

Claude Code reads `SPECYOU.md` on every prompt via a [hook](https://docs.anthropic.com/en/docs/claude-code/hooks). When it encounters a task, it searches your specs for relevant preferences and follows them.

## Writing specs

You don't write specs by hand. You tell Claude what to document.

```
> "Ask me 10 questions about how I handle errors"
> "Create a spec for my naming conventions"
> "I want to document my opinions on monetization"
```

Claude asks questions, uses your exact words, and saves the spec. You review it, edit if needed, done.

## Example spec

```markdown
# Naming

## Core Principle
Names should be as clear and simple as they need to be. No more, no less.

## The Scope-Length Rule
The length of a name should be proportional to its scope.
- Small scope (loops, lambdas): `i`, `x` are fine
- Large scope (globals, public APIs): `findUserByEmailAddress`

## Collections
Prefer plural nouns: `users`, not `userList` or `userArray`.

## For AI
- Auto-fix: Expand abbreviations to full words
- Ask first: Rename functions (might break imports)
- Never change: API routes, exported names, database columns
```

## Install

### npm (recommended)

```
npx specyou init
```

Creates `~/.specyou/`, scaffolds folders, configures the Claude Code hook automatically.

### Manual

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
            "command": "cat $HOME/.specyou/SPECYOU.md && echo '\\n\\n---\\nTo search specs use: Glob(pattern: **/*.md, path: $HOME/.specyou). Read specs relevant to the current task.'"
          }
        ]
      }
    ]
  }
}
```

### VS Code extension (optional)

Sidebar panel to browse, search, and manage your specs visually.

[Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=gundurraga.specyou)

## The idea

No one can replace a tasteful person. But a tasteful person can replace themselves.

Most AI personalization is shallow: "be concise" or "use TypeScript." specyou goes deeper. It captures the decisions you make instinctively: when to abstract, how to name things, what "good code" means to you, how you think about products, what your voice sounds like.

The result: AI output that's indistinguishable from your own work.

## License

MIT
