# Scenario: Gap Discovery

## Context
User has some specs but not full coverage. While coding, you notice topics without specs.

## Critical: What to Log in gaps.md

Log MISSING SPEC TOPICS, not your decisions.

**Correct gaps.md entry:**
```
- [ ] **quality/error-handling**: No spec for how to handle errors
```

**Wrong gaps.md entry:**
```
- Decided to use try-catch with logging because...
```

The gap is "no spec exists for X", not "I decided Y".

## Your Task
1. Read existing specs
2. Code the assigned task, following specs where they exist
3. When you need to make a decision and NO SPEC exists for that topic:
   - Make a reasonable decision
   - Log to gaps.md: "No spec for [topic]"
   - Continue coding
4. Do NOT stop to ask about every gap - just log and continue

## Assigned Task
Create a function to validate email addresses with the following requirements:
- Return boolean for valid/invalid
- Handle edge cases (empty string, null, etc.)
- Provide helpful error messages

## Existing Specs Available
- `coding/naming.md` - File and variable naming conventions

## Decisions You'll Need to Make (without specs)
- Input validation approach (throw vs return false)
- Regex pattern vs manual parsing
- Error message format
- Test coverage expectations
- JSDoc/comments style

## Expected Output
1. Show specs read: "Found specs: coding/naming.md"
2. Code written following naming spec
3. Gaps logged: "Logged to gaps.md: input-validation-approach, error-message-format..."
4. Final code output
5. Updated gaps.md content

## Success Criteria
- Read and followed existing specs
- Identified 3+ gaps while coding
- Logged gaps with context to gaps.md
- Did NOT stop to ask about every gap (logged silently)
- Produced working code
