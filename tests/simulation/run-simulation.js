#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { setupScenario, cleanup } = require('./setup-test-env');

const scenarioName = process.argv[2] || 'freshStart';

console.log('='.repeat(60));
console.log('YouSpec Simulation Runner');
console.log('='.repeat(60));

try {
  const { specsDir, scenario } = setupScenario(scenarioName);

  console.log(`\nScenario: ${scenario.name}`);
  console.log(`Description: ${scenario.description}`);
  console.log(`Specs Directory: ${specsDir}`);

  // Output the directory structure
  console.log('\nInitial directory structure:');
  function listDir(dir, indent = '') {
    if (!fs.existsSync(dir)) {
      console.log(`${indent}(empty)`);
      return;
    }
    const items = fs.readdirSync(dir);
    if (items.length === 0) {
      console.log(`${indent}(empty)`);
      return;
    }
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        console.log(`${indent}${item}/`);
        listDir(fullPath, indent + '  ');
      } else {
        console.log(`${indent}${item}`);
      }
    });
  }
  listDir(specsDir);

  // Load scenario prompt
  const scenarioFile = path.join(__dirname, 'scenarios', `${scenarioName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')}.md`);
  if (fs.existsSync(scenarioFile)) {
    console.log('\n' + '='.repeat(60));
    console.log('Scenario Instructions:');
    console.log('='.repeat(60));
    console.log(fs.readFileSync(scenarioFile, 'utf8'));
  }

  console.log('\n' + '='.repeat(60));
  console.log('Ready for agent simulation');
  console.log('='.repeat(60));
  console.log(`\nSpecs directory for agents: ${specsDir}`);
  console.log('\nTo run cleanup after simulation:');
  console.log(`node run-simulation.js cleanup ${specsDir}`);

} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}

// Handle cleanup command
if (process.argv[2] === 'cleanup' && process.argv[3]) {
  cleanup(process.argv[3]);
}
