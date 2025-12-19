# SpecYou Simulation Tests

Test that SpecYou works - AI reads specs, follows them, discovers gaps.

## Quick Start

```bash
node run-simulation.js freshStart
# Copy the output, paste to Claude Code, observe behavior
```

## Scenarios

| Scenario | Tests |
|----------|-------|
| freshStart | Empty specs -> 10 questions -> create specs |
| gapDiscovery | Partial specs -> code task -> log missing spec topics |
| organicGrowth | Review gaps -> propose spec -> 10 questions -> create |

## What Success Looks Like

**freshStart**: Agent asks 10 questions before writing anything. Spec uses user's words.

**gapDiscovery**: Agent logs "No spec for X" not "I decided Y". Continues coding.

**organicGrowth**: Agent proposes ONE spec topic. Asks 10 questions. Creates from answers.

## Key Rules Being Tested

1. **10-Question Flow** - Never write specs from assumptions
2. **gaps.md Purpose** - Only missing spec topics, not decisions
3. **User's DNA** - Specs reflect user's preferences, not AI's

## Running

```bash
# Setup scenario
node run-simulation.js <scenario>

# Gives you:
# - Test directory path
# - Scenario instructions to paste

# After simulation, check the test directory for results
```
