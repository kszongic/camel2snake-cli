# camel2snake-cli

[![npm version](https://img.shields.io/npm/v/@kszongic/camel2snake-cli)](https://www.npmjs.com/package/@kszongic/camel2snake-cli)
[![npm downloads](https://img.shields.io/npm/dm/@kszongic/camel2snake-cli)](https://www.npmjs.com/package/@kszongic/camel2snake-cli)
[![license](https://img.shields.io/npm/l/@kszongic/camel2snake-cli)](./LICENSE)
![node](https://img.shields.io/node/v/@kszongic/camel2snake-cli)
![zero deps](https://img.shields.io/badge/dependencies-0-brightgreen)
![cross-platform](https://img.shields.io/badge/platform-win%20%7C%20mac%20%7C%20linux-blue)

> Convert camelCase and PascalCase strings to snake_case from the command line. Zero dependencies.

```
$ camel2snake getElementById XMLParser parseHTTPResponse
get_element_by_id
xml_parser
parse_http_response
```

## Why?

- **API migrations** — JavaScript → Python field mapping in one pipe
- **Env var generation** — `camel2snake -u` turns config keys into `UPPER_SNAKE_CASE`
- **Acronym-aware** — `XMLParser` → `xml_parser`, not `x_m_l_parser`
- **Pipe-friendly** — reads stdin, writes stdout, composes with any tool
- **Zero dependencies** — installs in ~1 second

## Install

```bash
npm install -g @kszongic/camel2snake-cli

# Or use without installing
npx @kszongic/camel2snake-cli helloWorld
```

## Usage

```bash
# Single string
camel2snake helloWorld
# hello_world

# Multiple strings
camel2snake getElementById XMLParser MyComponent
# get_element_by_id
# xml_parser
# my_component

# UPPER_SNAKE_CASE (perfect for env vars)
camel2snake -u databaseUrl apiKey jwtSecret
# DATABASE_URL
# API_KEY
# JWT_SECRET

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

## Conversion Examples

| Input | Output | With `-u` |
|-------|--------|-----------|
| `helloWorld` | `hello_world` | `HELLO_WORLD` |
| `getElementById` | `get_element_by_id` | `GET_ELEMENT_BY_ID` |
| `XMLParser` | `xml_parser` | `XML_PARSER` |
| `MyComponent` | `my_component` | `MY_COMPONENT` |
| `parseHTTPResponse` | `parse_http_response` | `PARSE_HTTP_RESPONSE` |
| `getURLForID` | `get_url_for_id` | `GET_URL_FOR_ID` |

## Recipes

### Generate .env.example from config keys

```bash
cat <<EOF | camel2snake -u
databaseUrl
redisHost
jwtSecret
maxRetryCount
EOF
# DATABASE_URL
# REDIS_HOST
# JWT_SECRET
# MAX_RETRY_COUNT
```

### Map JS API fields to Python models

```bash
echo '{"firstName":"John","lastName":"Doe"}' \
  | node -e "process.stdout.write(Object.keys(JSON.parse(require('fs').readFileSync(0,'utf8'))).join('\n'))" \
  | camel2snake
# first_name
# last_name
```

### Create a JS-Python field mapping

```bash
paste <(cat fields.txt) <(cat fields.txt | camel2snake) > mapping.tsv
```

### Chain with other case converters

```bash
# camelCase → snake_case → kebab-case
echo "myVariableName" | camel2snake | snake2kebab
# my-variable-name
```

### npm scripts

```json
{
  "scripts": {
    "gen:env": "cat config-keys.txt | camel2snake -u > .env.example"
  }
}
```

### Shell alias

```bash
alias c2s='camel2snake'
alias c2S='camel2snake -u'
```

## How It Works

The converter scans each string character by character, inserting underscores at case boundaries. Consecutive uppercase characters (acronyms like `XML`, `HTTP`, `URL`) are treated as a single token rather than individual letters — so `XMLParser` correctly becomes `xml_parser`, not `x_m_l_parser`.

## Use Cases

- **Backend migrations** — Convert field names between JS/TS and Python/Ruby/Rust conventions
- **Environment variables** — Generate `UPPER_SNAKE_CASE` env var names from config
- **Database mapping** — Map ORM fields to SQL column names
- **Code generation** — Automate naming in scaffolding tools
- **CI/CD** — Enforce naming conventions in pipelines

## Comparison

| Tool | Zero Deps | Cross-Platform | Stdin | Acronyms | UPPER_SNAKE |
|------|-----------|---------------|-------|----------|-------------|
| **camel2snake-cli** | ✅ | ✅ | ✅ | ✅ | ✅ |
| `sed` regex | ✅ | ⚠️ GNU/BSD differ | ✅ | ❌ | Manual |
| `change-case` (lib) | ❌ | ✅ | ❌ | ✅ | ✅ |
| Python one-liner | ❌ needs Python | ✅ | ✅ | ❌ | Manual |
| Online converters | N/A | Browser | ❌ | Varies | Varies |

## Related Tools

Part of the [@kszongic](https://github.com/kszongic) case conversion family:

- [snake2camel-cli](https://github.com/kszongic/snake2camel-cli) — `snake_case` → `camelCase`
- [kebab2camel-cli](https://github.com/kszongic/kebab2camel-cli) — `kebab-case` → `camelCase`
- [kebab2snake-cli](https://github.com/kszongic/kebab2snake-cli) — `kebab-case` → `snake_case`
- [snake2pascal-cli](https://github.com/kszongic/snake2pascal-cli) — `snake_case` → `PascalCase`
- [pascal2snake-cli](https://github.com/kszongic/pascal2snake-cli) — `PascalCase` → `snake_case`

Other useful tools:

- [env-lint-cli](https://github.com/kszongic/env-lint-cli) — Validate .env files
- [dep-size](https://github.com/kszongic/dep-size) — Check npm dependency sizes
- [npm-name-check](https://github.com/kszongic/npm-name-check) — Check npm name availability

## License

MIT © 2026 kszongic
