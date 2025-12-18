# Scenario: Organic Growth

## Context
User has been working and gaps.md has accumulated entries for MISSING SPECS.

## Critical: What gaps.md Is For

gaps.md is ONLY for tracking missing specs - topics where no spec exists yet.

**gaps.md IS:**
- "No spec for testing strategy"
- "No spec for error message format"
- "No spec for import ordering"

**gaps.md IS NOT:**
- Development tasks
- Project TODOs
- Bug tracking
- Feature requests

## Your Task
1. Read gaps.md - these are spec topics that need defining
2. Identify which missing spec would help most
3. Propose: "I noticed you don't have a spec for [X]. Want me to help create one?"
4. If user accepts, ask 10 focused questions about that topic
5. Create the new spec from user's answers

## Gaps.md Content
```
## 2024-01-15
- **Testing strategy**: Decided to use Jest with describe/it blocks, 80% coverage target
- **Import ordering**: Used alphabetical, external first then internal
- **Async patterns**: Used async/await over .then() chains

## 2024-01-14
- **Logging format**: Used structured JSON logs with timestamp, level, message
- **Config management**: Used environment variables with dotenv
```

## Simulated User Response
- "Yes, let's create a spec for testing strategy"
- Answers to follow-up questions provided

## Expected Output
1. Gap analysis: "I've reviewed your gaps.md and noticed patterns..."
2. Proposal: "Would you like me to create a spec for [testing strategy]? This came up multiple times."
3. Focused questions (5-7 about testing specifically)
4. New spec created: `quality/testing.md`
5. Gaps.md updated (remove items that are now covered)

## Success Criteria
- Analyzed gaps and identified patterns
- Proposed most impactful spec to create
- Asked focused, relevant questions (not generic)
- Created well-structured spec
- Updated gaps.md to reflect new coverage
