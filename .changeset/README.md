# Changesets

This directory is managed by [@changesets/cli](https://github.com/changesets/changesets).

## Workflow

### During development
When your PR introduces a user-visible change, run:
```sh
pnpm changeset
```
Choose the bump type (`major` / `minor` / `patch`) and write a short description.  
This creates a Markdown file here. Commit it alongside your code changes.

### Releasing a new version
```sh
# 1. Consume all pending changesets → bumps package.json + updates CHANGELOG.md
pnpm version

# 2. Build + publish to npm
pnpm release
```

## Bump types

| Type | When to use |
|---|---|
| `patch` | Bug fixes, docs, internal refactors with no API change |
| `minor` | New features that are backward-compatible |
| `major` | Breaking changes to the public API |

