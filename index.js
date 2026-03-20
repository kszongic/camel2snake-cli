#!/usr/bin/env node
'use strict';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`Usage: camel2snake [options] [string ...]

Convert camelCase or PascalCase strings to snake_case.

Options:
  -u, --upper   Output UPPER_SNAKE_CASE
  -h, --help    Show this help
  -v, --version Show version

Examples:
  camel2snake helloWorld            # hello_world
  camel2snake getElementById        # get_element_by_id
  echo "myVar" | camel2snake       # my_var
  camel2snake -u helloWorld         # HELLO_WORLD`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  console.log(require('./package.json').version);
  process.exit(0);
}

const upper = args.includes('--upper') || args.includes('-u');
const inputs = args.filter(a => a !== '--upper' && a !== '-u');

function convert(str) {
  const result = str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();
  return upper ? result.toUpperCase() : result;
}

function processLine(line) {
  console.log(line.split(/\s+/).filter(Boolean).map(convert).join(' '));
}

if (inputs.length > 0) {
  console.log(inputs.map(convert).join(' '));
} else {
  let buf = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { buf += chunk; });
  process.stdin.on('end', () => {
    buf.split('\n').forEach(line => {
      if (line.length > 0) processLine(line);
    });
  });
}
