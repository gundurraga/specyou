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

## Architecture: Skills-Based System

**Key insight**: Don't load everything every time. AI loads SKILLS on demand.

```
~/.youspec/
  YOUSPEC.md          # Bootstrap: tells AI how to use youspec
  gaps.md             # AI logs ambiguities here

  skills/             # Modular skills, loaded on-demand
    coding/           # Coding DNA skills
      naming.md
      architecture.md
      errors.md
      testing.md
      git.md
    workflows/        # Non-coding skills
      brainstorming.md
      debugging.md
      code-review.md
      planning.md
```

**How skills work:**
- Each skill is a focused, standalone capability
- AI reads YOUSPEC.md once (small file) to know what skills exist
- AI loads specific skills based on current task
- Writing code? Load `skills/coding/naming.md`
- Debugging? Load `skills/workflows/debugging.md`
- Never reads everything

**YOUSPEC.md (tiny bootstrap file):**
```markdown
# YouSpec

My coding DNA lives in ~/.youspec/skills/

## When to Load What
| Task | Load these skills |
|------|-------------------|
| Writing code | coding/naming, coding/architecture |
| Debugging | workflows/debugging |
| Code review | workflows/code-review |
| Git operations | coding/git |
| Starting project | coding/architecture |
| Brainstorming | workflows/brainstorming |

## How to Use
1. Check table above for relevant skills
2. Load ONLY those skills (not everything)
3. If ambiguous, log to gaps.md and keep working
```

**Why skills vs flat specs:**
- Scales to 50+ files without overwhelming AI
- Clear separation: coding DNA vs workflow skills
- Extensible: add new skill categories without touching existing
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

## Summary: Skills-Based Design

```
~/.youspec/
  YOUSPEC.md              # Tiny bootstrap: skill routing table
  gaps.md                 # AI logs ambiguities here

  skills/
    coding/               # Coding DNA
      naming.md
      architecture.md
      errors.md
      testing.md
      git.md
    workflows/            # Non-coding skills
      brainstorming.md
      debugging.md
      code-review.md
      planning.md

~/.claude/CLAUDE.md includes:
  "Read ~/.youspec/YOUSPEC.md to know which skills to load for current task."
```

**Key principles:**
1. Skills loaded ON-DEMAND (not everything every time)
2. Warren Buffett philosophy: always bias toward simplicity
3. Opinionated spec creation: present pros/cons, recommend simpler option
4. Extensible: add new skill categories without touching existing

## What Makes This Different from spec-kit/OpenSpec/etc

| Them | YouSpec |
|------|---------|
| Project specs (what to build) | Personal DNA (how you code) |
| Per-project setup | Global, portable across projects |
| Tools/protocols | Just markdown files |
| Neutral on choices | Opinionated, biased toward simplicity |
| Read everything | Load skills on-demand |
| Coding only | Extensible to workflows (debug, brainstorm, review)

## MVP Scope

**Phase 0: Repo Setup**
- Copy plan to /specyou/specyou/PLAN.md
- git init
- MIT License (gundurraga)
- README.md (minimal: tagline + what this is)
- .gitignore

**Phase 1: Core**
- Create skills/coding/: naming.md, architecture.md, errors.md
- Create YOUSPEC.md (bootstrap)
- Create gaps.md
- Create spec-creation-prompt.md (the Warren Buffett questionnaire)
- Update ~/.claude/CLAUDE.md to integrate

**Phase 2: Workflows**
- Add skills/workflows/: debugging.md, code-review.md
- Slash command: /youspec-init for interactive setup

**Phase 3: Sharing**
- "Starter packs" for different styles
- Public release
