const fs = require('fs');
const path = require('path');
const config = require('./config');

function createEmptySpecsDir(specsDir) {
  // Create the base structure with empty folders
  const structure = [
    'specs/coding',
    'specs/architecture',
    'specs/quality',
    'specs/collaboration',
    'specs/process',
    'specs/personality'
  ];

  structure.forEach(dir => {
    fs.mkdirSync(path.join(specsDir, dir), { recursive: true });
  });

  // Create empty YOUSPEC.md
  fs.writeFileSync(
    path.join(specsDir, 'YOUSPEC.md'),
    '# YouSpec\n\nYour coding DNA lives here.\n'
  );

  // Create empty gaps.md
  fs.writeFileSync(
    path.join(specsDir, 'gaps.md'),
    '# Gaps\n\nDecisions made without specs are logged here.\n'
  );

  return specsDir;
}

function createPartialSpecs(specsDir) {
  createEmptySpecsDir(specsDir);

  // Add one spec to simulate partial setup
  const namingSpec = `# Naming Conventions

## Rule
Use kebab-case for files, camelCase for variables.

## Why
- Consistency across codebase
- Easy to read and search

## Priorities
1. MUST: Files are kebab-case
2. MUST: Variables are camelCase
3. SHOULD: No abbreviations

## For AI
- Auto-fix allowed: File renaming to kebab-case
- Ask first: Renaming existing variables
- Never change: Public API names
`;

  fs.writeFileSync(
    path.join(specsDir, 'specs/coding/naming.md'),
    namingSpec
  );

  return specsDir;
}

function createFullSpecs(specsDir) {
  createPartialSpecs(specsDir);

  // Add more specs
  const simplicitySpec = `# Simplicity

## Rule
Keep functions under 30 lines, prefer early returns.

## Why
- Easier to test
- Easier to understand
- Reduces cognitive load

## Priorities
1. MUST: Functions under 50 lines (hard limit)
2. SHOULD: Functions under 30 lines (target)
3. SHOULD: Single responsibility per function

## For AI
- Auto-fix allowed: Extracting helper functions
- Ask first: Major refactoring
- Never change: Core business logic structure
`;

  const errorSpec = `# Error Handling

## Rule
Fail fast, be explicit, never swallow errors.

## Why
- Debugging is easier
- Problems surface early
- Clear error messages help users

## Priorities
1. MUST: Never empty catch blocks
2. MUST: Log errors with context
3. SHOULD: Use custom error types

## For AI
- Auto-fix allowed: Adding error logging
- Ask first: Changing error types
- Never change: Error messages shown to users
`;

  fs.writeFileSync(
    path.join(specsDir, 'specs/coding/simplicity.md'),
    simplicitySpec
  );

  fs.writeFileSync(
    path.join(specsDir, 'specs/quality/error-handling.md'),
    errorSpec
  );

  return specsDir;
}

function addGapsToSpecs(specsDir) {
  const gaps = `# Gaps

Decisions made without specs are logged here.

## 2024-01-15
- **Testing strategy**: Decided to use Jest with describe/it blocks, 80% coverage target
- **Import ordering**: Used alphabetical, external first then internal
- **Async patterns**: Used async/await over .then() chains

## 2024-01-14
- **Logging format**: Used structured JSON logs with timestamp, level, message
- **Config management**: Used environment variables with dotenv
`;

  fs.writeFileSync(path.join(specsDir, 'gaps.md'), gaps);
  return specsDir;
}

function setupScenario(scenarioName) {
  const scenario = config.scenarios[scenarioName];
  if (!scenario) {
    throw new Error(`Unknown scenario: ${scenarioName}`);
  }

  const specsDir = config.testSpecsDir + '-' + scenarioName;

  // Clean up if exists
  if (fs.existsSync(specsDir)) {
    fs.rmSync(specsDir, { recursive: true });
  }

  if (!scenario.specsExist) {
    // Just create the directory, nothing inside
    fs.mkdirSync(specsDir, { recursive: true });
  } else if (scenario.partialSpecs) {
    createPartialSpecs(specsDir);
  } else if (scenario.fullSpecs) {
    createFullSpecs(specsDir);
  } else {
    createEmptySpecsDir(specsDir);
  }

  if (scenario.hasGaps) {
    addGapsToSpecs(specsDir);
  }

  console.log(`Setup complete for scenario: ${scenario.name}`);
  console.log(`Specs directory: ${specsDir}`);

  return { specsDir, scenario };
}

function cleanup(specsDir) {
  if (fs.existsSync(specsDir)) {
    fs.rmSync(specsDir, { recursive: true });
    console.log(`Cleaned up: ${specsDir}`);
  }
}

module.exports = {
  setupScenario,
  cleanup,
  createEmptySpecsDir,
  createPartialSpecs,
  createFullSpecs
};
