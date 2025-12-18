const path = require('path');
const os = require('os');

module.exports = {
  // Isolated test directory (not real ~/.youspec)
  testSpecsDir: path.join(os.tmpdir(), 'youspec-test-' + Date.now()),

  // Results storage
  resultsDir: path.join(__dirname, 'results'),

  // Scenarios
  scenarios: {
    freshStart: {
      name: 'Fresh Start - Init Flow',
      description: 'Simulate user with no specs, agent offers init questionnaire',
      specsExist: false
    },
    gapDiscovery: {
      name: 'Gap Discovery',
      description: 'Agent codes, finds decision without spec, logs to gaps.md',
      specsExist: true,
      partialSpecs: true
    },
    organicGrowth: {
      name: 'Organic Growth',
      description: 'Agent reviews gaps.md, proposes new spec creation',
      specsExist: true,
      hasGaps: true
    },
    specUsage: {
      name: 'Spec Usage & Validation',
      description: 'Agent reads specs, codes following them, reviewer validates',
      specsExist: true,
      fullSpecs: true
    }
  },

  // Simulated coding tasks for agents
  codingTasks: [
    'Create a function to validate email addresses',
    'Build a simple REST API endpoint for user registration',
    'Write a utility to parse and format dates',
    'Implement error handling for a file upload feature'
  ],

  // Questions for init flow (subset)
  initQuestions: {
    naming: [
      'How do you prefer to name variables? (camelCase, snake_case, etc.)',
      'How do you name files? (kebab-case, PascalCase, etc.)',
      'Do you use abbreviations in names? (e.g., btn vs button)'
    ],
    simplicity: [
      'What is your max preferred function length in lines?',
      'Do you prefer early returns or single return?',
      'Comments: minimal, moderate, or extensive?'
    ],
    errorHandling: [
      'Try-catch style: wrap everything or specific spots?',
      'How do you prefer to handle null/undefined?'
    ],
    git: [
      'Commit message style: conventional commits, free-form?',
      'Do you squash commits or keep history?'
    ]
  }
};
