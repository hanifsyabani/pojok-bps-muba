---
name: install-anti-slop
description: Install, configure, update, or upgrade vendored anti-slop Oxlint plugins. Use when adding anti-slop, picking up upstream rules or fixes, or migrating an existing installation while preserving local customizations.
source: https://github.com/dmmulroy/anti-slop
---

# Install or update anti-slop

Anti-slop is vendored code: the target repository owns its rules, diagnostics, tests, and configuration. Preserve those choices when bringing in upstream changes.

## Choose the path

Read the repository's agent instructions and `git status`. Identify its package manager, Oxlint/Vite+ configuration, and any existing anti-slop entry points, including renamed or relocated copies referenced by `jsPlugins`.

- **Existing installation — update, upgrade, migrate, or reconfigure:** read update procedure and follow that instead of the fresh-install steps below.
- **No installation — fresh install:** follow the procedure below. If the user requested an update but no installation can be found, confirm the target before installing.

Complete when the operation and target path are established and pre-existing work is identified.

## Fresh install

1. Install current compatible dependencies:
   - If the repository already depends on `oxlint`, read its installed version from the package manager or lockfile and install `@oxlint/plugins` at exactly that version.
   - Only when the repository has no `oxlint` dependency, query `npm view oxlint version` and `npm view @oxlint/plugins version`, then install the same current version of both packages.
   - `oxlint` is a development dependency.

2. Register the generic plugin, configure ignores, and enable all generic rules. For `oxlint.config.ts` or `.oxlintrc.json`, merge these fields with the existing configuration:

   ```ts
   ignorePatterns: [
     ".agent/**",
     ".agents/**",
     ".claude/**",
     ".codex/**",
     ".continue/**",
     ".cursor/**",
     ".gemini/**",
     ".opencode/**",
     ".pi/**",
     ".roo/**",
     ".windsurf/**",
     "tools/oxlint/anti-slop/**",
   ],
   jsPlugins: [
     { name: "anti-slop", specifier: "./tools/oxlint/anti-slop/index.js" },
   ],
   rules: {
     "anti-slop/no-broad-catch": "error",
     "anti-slop/no-consolelog": "warn",
     "anti-slop/no-magic-numbers": "warn",
     "anti-slop/prefer-const": "error",
   }
   ```

3. Verify the installation works:
   ```bash
   npx oxlint .
   ```

## Key anti-slop rules

| Rule | Level | Purpose |
|------|-------|---------|
| `no-broad-catch` | error | Prevents `catch(e){}` swallowing errors |
| `no-consolelog` | warn | Flags leftover debug logs |
| `no-magic-numbers` | warn | Requires named constants |
| `prefer-const` | error | Enforces immutability where possible |
| `no-any` | warn | Discourages TypeScript `any` |

## Source
- Repository: https://github.com/dmmulroy/anti-slop
- Stars: 5,261 | Forks: 124
