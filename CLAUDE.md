# YouSpec Development Guide

## Project Overview

YouSpec is a VS Code extension that manages personal coding preferences. Specs are stored as plain markdown files in `~/.youspec/`.

## Architecture

### File Structure
- `extension.js` - Main extension code (single file, CommonJS)
- `package.json` - VS Code extension manifest
- `.vscode/launch.json` - Debug configuration
- `PLAN.md` - Full project plan and philosophy

### Storage
- Location: `~/.youspec/` (user home directory)
- Format: Plain markdown files in hierarchical folder structure
- No database, pure filesystem

### Folder Structure
```
~/.youspec/
  YOUSPEC.md              # Bootstrap
  gaps.md                 # AI logs missing specs here
  specs/
    coding/               # How you write
    architecture/         # How you design
    quality/              # How you ensure it works
    collaboration/        # How you work with others
    process/              # How you think
    personality/          # Who you are
```

### Key Components

**ensureDefaultStructure()** (`extension.js:8-36`)
- Creates ~/.youspec/ if missing
- Creates specs/ with category folders
- Creates default YOUSPEC.md and gaps.md

**SkillsProvider Class** (`extension.js:86-149`)
- Implements VS Code TreeDataProvider interface
- `getChildren()` - Recursively loads folder contents
- `getParent()` - Required for drag and drop support
- Items sorted: folders first, then files (alphabetically)

**Commands**
- `youspec.addSpec` - Create new spec file with template
- `youspec.addFolder` - Create nested folders
- `youspec.copySpec` - Copy spec content to clipboard
- `youspec.deleteItem` - Delete file or folder
- `youspec.renameItem` - Rename file or folder
- `youspec.refresh` - Manual refresh

**File Watcher** (`extension.js:198-204`)
- Pattern: `**/*` (watches all nested files)
- Auto-refreshes tree on create/delete/change

## Testing Locally

```bash
code --extensionDevelopmentPath=/Users/gundurraga/Desktop/indie-dev/specyou/specyou
```

Or press F5 in VS Code to launch extension development host.

## Spec Structure Standard

Every spec should follow this structure for AI consumption:

```markdown
# Topic

## Rule
Core principle in one sentence.

## Why
- Reason 1
- Reason 2

## Priorities
1. MUST: non-negotiable
2. SHOULD: strong preference
3. MAY: acceptable when needed

## For AI
- Auto-fix allowed: [what AI can change without asking]
- Ask first: [what AI should confirm]
- Never change: [what AI should not touch]

## Anti-patterns
What to avoid with examples.

## Exceptions
When to break the rule.

## Examples
Good vs bad with inline code.
```

## Development Guidelines

- All files should be kebab-case
- Keep code simple, readable, maintainable
- No legacy or dead code
- Single extension.js file (no unnecessary complexity)
- Never commit without explicit user request

## Publishing

When ready to publish:
1. Update version in `package.json`
2. Test thoroughly with local extension
3. Run `vsce package` to create .vsix
4. Publish to marketplace with `vsce publish`
