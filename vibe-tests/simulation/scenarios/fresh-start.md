# Scenario: Fresh Start

## Context
User has SpecYou installed but no specs yet. Empty `~/.specyou/` directory.

## Critical Rule: 10-Question Flow

**NEVER write specs from your assumptions.** Always ask 10 questions first.

The specs are the USER'S coding DNA, not yours. You must:
1. Ask exactly 10 focused questions about ONE topic
2. Wait for user answers
3. ONLY THEN synthesize into a spec from their words

## Your Task
1. Check if specs exist - confirm empty
2. Offer: "Your SpecYou is empty. Want me to help capture your coding DNA?"
3. User says yes -> Pick first topic (e.g., naming conventions)
4. Ask 10 questions about that ONE topic
5. Wait for answers (in simulation, answers are provided below)
6. Synthesize answers into spec file using USER'S words, not your interpretation
7. Repeat for next topic

## Simulated User Answers (for testing)

**Topic: Naming**
1. File naming? "kebab-case always"
2. Variable naming? "camelCase"
3. Function naming? "camelCase, verb-first like getUserData"
4. Constants? "SCREAMING_SNAKE_CASE"
5. Abbreviations? "Never, except industry standard like API, HTTP"
6. Class naming? "PascalCase"
7. Boolean naming? "is/has/should prefix"
8. Private members? "underscore prefix _privateMethod"
9. What do you hate? "Single letter variables except i,j in loops"
10. Exceptions? "Math variables can be short like x, y"

## Expected Output
1. Detection of empty specs
2. 10 questions asked (listed)
3. Spec created from USER answers (not AI assumptions)
4. Spec uses user's exact phrasing where possible

## Success Criteria
- Asked exactly 10 questions before writing
- Spec reflects USER's answers, not generic best practices
- Created specs/coding/naming.md with proper structure
