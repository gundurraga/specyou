# YouSpec: Your Coding DNA

## Vision

**YouSpec** = Your coding DNA, portable across any AI.

Document your coding style once - naming, architecture, patterns, preferences - and every AI coding assistant follows it. No custom tools, no complex protocols. Just markdown files with a smart structure that any LLM can grep/read.

## Core Principles

1. **Files only** - No database, no server, no protocol. Just markdown.
2. **Greppable** - Structure optimized for LLM text search
3. **Portable** - Works with Claude Code, Cursor, Codex, Gemini, anything
4. **Local first** - Lives in ~/.youspec/, yours forever
5. **Copy to own** - Fork others' DNA, no sync/inheritance complexity

## Architecture: Specs-Based System

**Key insight**: Don't load everything every time. AI loads SPECS on demand.

```
~/.youspec/
  YOUSPEC.md          # Bootstrap: tells AI how to use youspec
  gaps.md             # AI logs ambiguities here

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

**Why specs vs flat files:**

- Scales to 50+ files without overwhelming AI
- Clear categories match how developers think
- Extensible: add new spec categories without touching existing
- On-demand loading = faster, cheaper, less noise

## THE CORE PRODUCT: Spec Creation Process

The questionnaire prompt is the most important artifact. It must:

- Ask smart questions that reveal real preferences
- Be OPINIONATED - like Warren Buffett picking stocks
- Always bias toward: **simplicity, clarity, brevity**
- Present pros/cons but RECOMMEND the simpler choice
- Generate specs that are clear and actionable

### The Warren Buffett Philosophy

**Investment thesis for coding standards:**
Just like Buffett has principles for picking stocks (moat, management, margin of safety), we have principles for picking standards:

1. **Simplicity over cleverness** - Can a junior dev understand it in 30 seconds?
2. **Clarity over brevity** - Better to be explicit than save keystrokes
3. **Convention over configuration** - Use language defaults when possible
4. **Boring over novel** - Proven patterns beat clever innovations
5. **Local over global** - Prefer decisions at smallest possible scope

**When presenting options, always show:**

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

### Questionnaire Design Philosophy

**Principles:**

1. One question at a time (not overwhelming)
2. Show examples/options (not open-ended vagueness)
3. ALWAYS recommend the simpler option
4. Ask "why" to capture reasoning, not just preference
5. If user picks complex option, ask "Are you sure? Here's what you're trading..."
6. Start general, drill into specifics only where needed

**Flow: General -> Specific**

```
Level 1: IDENTITY
  "What languages do you work with?"
  "What type of projects? (web, CLI, mobile, infra)"

Level 2: PHILOSOPHY
  "Simplicity vs flexibility - which do you optimize for?"
  "Do you prefer explicit or implicit patterns?"

Level 3: CONVENTIONS
  "How do you name things? (variables, functions, files)"
  "How do you organize folders?"

Level 4: PRACTICES
  "How do you handle errors?"
  "How do you test?"
  "How do you document?"

Level 5: STACK-SPECIFIC
  "For Python specifically, do you..."
  "For TypeScript specifically, do you..."
```

## Summary: Specs-Based Design

```
~/.youspec/
  YOUSPEC.md              # Tiny bootstrap
  gaps.md                 # AI logs ambiguities here

  specs/
    coding/               # How you write
    architecture/         # How you design
    quality/              # How you ensure it works
    collaboration/        # How you work with others
    process/              # How you think
    personality/          # Who you are

~/.claude/CLAUDE.md includes:
  "Read ~/.youspec/YOUSPEC.md to know which specs to load for current task."
```

**Key principles:**

1. Specs loaded ON-DEMAND (not everything every time)
2. Warren Buffett philosophy: always bias toward simplicity
3. Opinionated spec creation: present pros/cons, recommend simpler option
4. Extensible: add new spec categories without touching existing

## What Makes This Different from spec-kit/OpenSpec/etc

| Them                          | YouSpec                                |
| ----------------------------- | -------------------------------------- |
| Project specs (what to build) | Personal DNA (how you code)            |
| Per-project setup             | Global, portable across projects       |
| Tools/protocols               | Just markdown files                    |
| Neutral on choices            | Opinionated, biased toward simplicity  |
| Read everything               | Load specs on-demand                   |
| Coding only                   | Full dev lifecycle (quality, process)  |

## Distribution: VS Code Extension

YouSpec will be a VS Code extension.

**Why extension:**

- Easy install from VS Code marketplace
- No manual folder copying
- Sidebar UI to browse/edit specs
- Commands for spec creation
- Works alongside Claude Code, Cursor, etc.

**Extension features:**

- Sidebar view showing ~/.youspec/ tree
- Create/edit/delete specs
- Copy spec content to clipboard
- "Create Spec" command with questionnaire
- File watcher for real-time sync

**Tech stack (same as Memopad):**

- Plain JavaScript (no TypeScript)
- VS Code API only (no dependencies)
- File-based storage (~/.youspec/)
- Single extension.js file

## MVP Scope (Revised)

**Phase 0: Repo Setup** [DONE]

- PLAN.md, README.md, LICENSE, .gitignore, git init

**Phase 1: VS Code Extension Skeleton**

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
- Warren Buffett philosophy in prompts
- Generate specs from answers

**Phase 4: Publish**

- VS Code marketplace
- "Starter packs" as downloadable spec sets
