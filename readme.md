# camel2snake-cli

[![npm version](https://img.shields.io/npm/v/@kszongic/camel2snake-cli)](https://www.npmjs.com/package/@kszongic/camel2snake-cli)
[![license](https://img.shields.io/npm/l/@kszongic/camel2snake-cli)](./LICENSE)

> Convert camelCase and PascalCase strings to snake_case from the command line. Zero dependencies.

## Install

```bash
npm install -g @kszongic/camel2snake-cli
```

## Usage

```bash
# Basic conversion
camel2snake helloWorld
# hello_world

# Multiple strings
camel2snake getElementById XMLParser
# get_element_by_id xml_parser

# UPPER_SNAKE_CASE
camel2snake -u helloWorld
# HELLO_WORLD

# Pipe from stdin
echo "myVariable" | camel2snake
# my_variable

cat identifiers.txt | camel2snake
```

## Options

| Flag | Description |
|------|-------------|
| `-u, --upper` | Output UPPER_SNAKE_CASE |
| `-h, --help` | Show help |
| `-v, --version` | Show version |

## Examples

| Input | Output |
|-------|--------|
| `helloWorld` | `hello_world` |
| `getElementById` | `get_element_by_id` |
| `XMLParser` | `xml_parser` |
| `MyComponent` | `my_component` |
| `parseHTTPResponse` | `parse_http_response` |

## License

MIT © 2026 kszongic
