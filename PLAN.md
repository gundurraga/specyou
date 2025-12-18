# YouSpec: Your Coding Preferences, Portable

## Vision

Stop re-explaining your coding style to every AI assistant.

Document your preferences once in `~/.youspec/` - naming, architecture, patterns, aesthetics - and every AI assistant reads them automatically. No custom tools, no protocols. Just markdown files with a smart structure.

## Core Principles

1. **Files only** - No database, no server, no protocol. Just markdown.
2. **Greppable** - Structure optimized for LLM text search
3. **Portable** - Works with Claude Code, Cursor, Codex, Gemini, anything
4. **Local first** - Lives in ~/.youspec/, yours forever
5. **On-demand** - AI loads only specs relevant to current task

## Architecture: Specs-Based System

**Key insight**: Don't load everything every time. AI loads specs on demand.

```
~/.youspec/
  YOUSPEC.md          # Bootstrap: tells AI how to use YouSpec
  gaps.md             # AI logs decisions without specs here

  specs/              # Modular specs, loaded on-demand
    coding/           # How you write (naming, functions, errors, comments)
    architecture/     # How you design (organization, dependencies, state)
    quality/          # How you ensure it works (testing, debugging, logging)
    collaboration/    # How you work with others (git, code-review, docs)
    process/          # How you think (problem-solving, refactoring, iteration)
    personality/      # Who you are (aesthetics, interests, communication style)
```

**How specs work:**

- Each spec is a focused, standalone preference
- AI reads YOUSPEC.md once (small file) to know what specs exist
- AI loads specific specs based on current task
- Writing code? Load `specs/coding/naming.md`
- Debugging? Load `specs/quality/debugging.md`
- Never reads everything

## The Core Product: Spec Creation

The questionnaire is the most important artifact. It must reveal real preferences, not aspirational answers.

### The Buffett Test

Before recommending any option, apply these tests:

1. **The 10-year test**: Will this choice still make sense in 10 years?
   - Proven patterns: YES
   - Trendy frameworks: MAYBE

2. **The circle of competence**: Do you understand it fully?
   - Language defaults: YES
   - Custom abstractions: REQUIRES DEEP KNOWLEDGE

3. **The margin of safety**: What happens when it breaks?
   - Explicit code: Easy to debug
   - Magic/implicit: Hard to trace

4. **The moat**: Does this create or destroy maintainability?
   - Simple patterns: Anyone can maintain
   - Clever code: Only you can maintain = bus factor risk

### Principles for Picking Standards

1. **Simplicity over cleverness** - Can a junior dev understand it in 30 seconds?
2. **Clarity over brevity** - Better to be explicit than save keystrokes
3. **Convention over configuration** - Use language defaults when possible
4. **Boring over novel** - Proven patterns beat clever innovations
5. **Delete over preserve** - Dead code rots. Comments lie. Remove ruthlessly.
6. **Narrow scope over wide** - Decide at the smallest possible level
7. **Break rules when they hurt** - Principles guide, don't dictate. Document exceptions.

### When Principles Conflict

Principles guide, but vision wins. Here's the hierarchy:

1. **Does it work?** (correctness beats elegance)
2. **Does it match the vision?** (right complexity beats wrong simplicity)
3. **Can it be maintained?** (future you beats present you)
4. **Is it simple?** (only after 1-3 are satisfied)

**Examples:**

Conflict: "Simplicity says delete this abstraction, but the vision requires flexibility"
Resolution: Keep the abstraction, document why in a comment

Conflict: "Convention says use REST, but our real-time needs require WebSockets"
Resolution: Use WebSockets, document deviation in architecture/ spec

### When presenting options:

```
Option A: [The simple choice]
  Pros: Easy to read, easy to maintain, no surprises
  Cons: More verbose

Option B: [The clever choice]
  Pros: Less code, more flexible
  Cons: Requires knowledge, surprises newcomers

RECOMMENDATION: Option A
Why: The time saved by clever code is lost 10x in debugging and onboarding.
```

## Questionnaire Design

### Philosophy

Reveal preferences through concrete examples, not abstract questions.

**Bad question:** "Do you prefer simplicity or flexibility?"
**Good question:** "Here's a function with 3 optional parameters. Would you: A) Keep positional args, B) Use options object, C) Split into smaller functions"

### Flow: Concrete -> Abstract -> Synthesize

**Level 1: CONTEXT**
- "What languages? (JavaScript, Python, Go, etc.)"
- "What projects? (web apps, CLIs, mobile, infra)"

**Level 2: REVEAL PREFERENCES (Show, don't ask)**
- "Here's a function with 3 parameters. Would you:
   A) Keep as positional args
   B) Use an options object
   C) Split into smaller functions"

- "Here's a 50-line function. Would you:
   A) Break into 3 smaller functions
   B) Add comments to mark sections
   C) Leave it - it's a single logical unit"

**Level 3: VALIDATE CONSISTENCY**
Based on answers, show their implicit philosophy:
"You seem to prefer [explicit/implicit]. Does this sound right?"

**Level 4: DRILL INTO GAPS**
Only ask detailed questions where answers conflict or are unclear

**Level 5: CAPTURE EXCEPTIONS**
"When would you break these rules?"

## Spec Structure

Every spec should follow this structure:

```markdown
# Topic

## Rule
Core principle in one sentence.

## Why
- Reason 1
- Reason 2

## Priorities (in order)
1. MUST: non-negotiable
2. SHOULD: strong preference
3. MAY: acceptable when needed

## For AI: Auto-Fixes Allowed
- What AI can change without asking
- What AI should ask about first
- What AI should never change

## Anti-patterns
What to avoid with examples.

## Exceptions
When to break the rule.

## Examples
Good vs bad with inline code.
```

## Distribution: VS Code Extension

**Why extension:**
- Easy install from VS Code marketplace
- No manual folder copying
- Sidebar UI to browse/edit specs
- Commands for spec creation
- Works alongside Claude Code, Cursor, etc.

**Features:**
- Sidebar view showing ~/.youspec/ tree
- Create/edit/delete specs
- Copy spec content to clipboard
- "Create Spec" command with questionnaire
- File watcher for real-time sync

**Tech stack:**
- Plain JavaScript (no TypeScript)
- VS Code API only (no dependencies)
- File-based storage (~/.youspec/)
- Single extension.js file

## MVP Phases

**Phase 0: Repo Setup** [DONE]
- PLAN.md, README.md, LICENSE, .gitignore, git init

**Phase 1: VS Code Extension Skeleton** [DONE]
- package.json (VS Code manifest)
- extension.js (sidebar + basic commands)
- Activity bar icon
- Tree view for ~/.youspec/

**Phase 2: Core Specs**
- Default specs in each category
- YOUSPEC.md (bootstrap file)
- gaps.md
- "Copy spec" and "Edit spec" commands

**Phase 3: Spec Creation**
- "Create Spec" command with questionnaire
- Buffett Test philosophy in prompts
- Generate specs from answers

**Phase 4: Publish**
- VS Code marketplace
- "Starter packs" as downloadable spec sets
