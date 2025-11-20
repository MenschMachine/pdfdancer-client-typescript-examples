#!/usr/bin/env node
/**
 * Cross-platform script to run all example TypeScript files
 * Works on Windows, macOS, and Linux
 */

const { readdirSync, statSync } = require('fs');
const { join, relative } = require('path');
const { spawnSync } = require('child_process');

/**
 * Recursively find all .ts files in a directory
 */
function findTsFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts') && file !== 'shared.ts') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Run all example files
 */
function runExamples() {
  const examplesDir = join(__dirname, '..', 'examples');
  const files = findTsFiles(examplesDir);

  // Sort files alphabetically
  files.sort();

  console.log(`Found ${files.length} example file(s) to run\n`);

  for (const file of files) {
    const relativePath = relative(process.cwd(), file);
    console.log(`Running ${relativePath}...`);

    const result = spawnSync('npx', ['tsx', file], {
      stdio: 'inherit',
      shell: true, // Required for Windows to find npx
    });

    if (result.status !== 0) {
      console.error(`\n❌ Failed to run ${relativePath}`);
      process.exit(1);
    }

    console.log(''); // Empty line for readability
  }

  console.log('✅ All examples completed successfully!');
}

// Run the script
runExamples();
