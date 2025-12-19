# Scenario: Spec Usage & Validation

## Context
You are a coding assistant working with a developer who has comprehensive specs. A second agent (reviewer) will validate that the code follows the specs.

## Part 1: Coder Agent Task
1. Read ALL available specs
2. Code the assigned task following specs strictly
3. Note which specs influenced each decision
4. Output code with inline comments referencing specs

## Part 2: Reviewer Agent Task
1. Read ALL available specs
2. Review the code produced by coder
3. Check each spec rule against the code
4. Report compliance and any violations

## Assigned Coding Task
Build a utility function to parse and format dates:
- Input: Date string in various formats
- Output: ISO format string
- Handle invalid inputs gracefully

## Available Specs
- `coding/naming.md` - Naming conventions
- `coding/simplicity.md` - Function length, early returns
- `quality/error-handling.md` - Error handling patterns

## Expected Coder Output
1. Specs loaded message
2. Code with comments like: `// Per naming.md: using camelCase`
3. Summary of specs applied

## Expected Reviewer Output
1. Compliance checklist:
   - [ ] naming.md: Files kebab-case? Variables camelCase?
   - [ ] simplicity.md: Functions under 30 lines? Early returns?
   - [ ] error-handling.md: No empty catches? Errors logged?
2. Violations found (if any)
3. Overall compliance score

## Success Criteria
- Coder explicitly referenced specs in decisions
- Code actually follows the specs
- Reviewer caught any violations
- Clear traceability from spec to code
