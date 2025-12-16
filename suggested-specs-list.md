# Suggested Specs List

Universal specs that senior developers worldwide would agree on.

---

## Coding (How You Write)

1. **naming** - Files, variables, functions, classes, constants
2. **functions** - Size, parameters, single responsibility, return values
3. **error-handling** - Fail fast, fail loud, recovery strategies
4. **comments** - When to comment, self-documenting code, TODOs
5. **simplicity** - YAGNI, minimal viable solution, no over-engineering
6. **readability** - Clear over clever, optimize for reading
7. **abstractions** - When to abstract, layers, premature abstraction
8. **types** - Type safety, type design, strict mode

## Architecture (How You Design)

9. **code-organization** - File structure, feature vs layer, proximity
10. **dependencies** - When to add, auditing, minimizing
11. **state** - Where state lives, immutability, global vs local
12. **configuration** - Environment variables, secrets, validation
13. **api-design** - REST principles, versioning, contracts, status codes
14. **database** - Schema design, queries, migrations, indexing
15. **separation-of-concerns** - Boundaries, layers, repository pattern
16. **resilience** - Retry, timeouts, circuit breakers, graceful degradation

## Quality (How You Ensure It Works)

17. **testing** - What to test, unit vs integration, coverage philosophy
18. **debugging** - Systematic approach, bisect, reproduce first
19. **logging** - What to log, levels, structured logging, no PII
20. **security** - Input validation, auth, secrets, OWASP basics
21. **performance** - Measure first, premature optimization, profiling
22. **edge-cases** - Null handling, empty states, boundaries

## Collaboration (How You Work With Others)

23. **git** - Commit messages, branch strategy, PR size, atomic commits
24. **code-review** - What to look for, giving feedback, approving
25. **documentation** - README, architecture docs, when to update/delete

## Process (How You Think)

26. **problem-solving** - Understand before coding, break down, spike
27. **technical-debt** - When to take, tracking, when to pay
28. **refactoring** - When to refactor, safe refactoring, boy scout rule
29. **iteration** - MVP mindset, ship fast, perfect vs done

---

**Total: 29 specs**

## Notes

- Each spec should fit in one markdown file
- Focus on "why" not just "what"
- Include exceptions (when to break the rule)
- Keep opinionated but acknowledge trade-offs
