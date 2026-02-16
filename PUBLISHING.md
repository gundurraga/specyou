# Publishing

## npm (cli/)

```
cd cli
npm publish
```

npm will open a browser window for authentication. Confirm in the browser and it publishes.

The `prepublishOnly` script copies `templates/` into `cli/templates/` automatically.

## VS Code extension

```
vsce package
vsce publish
```

## Version sync

Keep versions in sync across both packages:

- `cli/package.json` (npm)
- `package.json` (VS Code extension)

Bump both before publishing.
