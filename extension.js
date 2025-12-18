const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const os = require('os');

const YOUSPEC_DIR = path.join(os.homedir(), '.youspec');

function ensureDefaultStructure() {
    if (!fs.existsSync(YOUSPEC_DIR)) {
        fs.mkdirSync(YOUSPEC_DIR, { recursive: true });
    }

    const specsDir = path.join(YOUSPEC_DIR, 'specs');
    const folders = [
        path.join(specsDir, 'coding'),
        path.join(specsDir, 'architecture'),
        path.join(specsDir, 'quality'),
        path.join(specsDir, 'collaboration'),
        path.join(specsDir, 'process'),
        path.join(specsDir, 'personality')
    ];

    for (const folder of folders) {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
    }

    const youspecPath = path.join(YOUSPEC_DIR, 'YOUSPEC.md');
    if (!fs.existsSync(youspecPath)) {
        fs.writeFileSync(youspecPath, getDefaultYouspecContent(), 'utf8');
    }

    const gapsPath = path.join(YOUSPEC_DIR, 'gaps.md');
    if (!fs.existsSync(gapsPath)) {
        fs.writeFileSync(gapsPath, getDefaultGapsContent(), 'utf8');
    }
}

function getDefaultYouspecContent() {
    return `# YouSpec: My Coding Preferences

This is my personal coding DNA - preferences, style, and decision-making patterns that travel with me across all projects.

Location: ~/.youspec/

## Structure

\`\`\`
~/.youspec/
├── YOUSPEC.md (this file)
├── gaps.md (missing spec topics)
└── specs/
    ├── coding/           (how I write code)
    ├── architecture/     (how I design systems)
    ├── quality/          (how I ensure correctness)
    ├── collaboration/    (how I work with others)
    ├── process/          (how I approach problems)
    └── personality/      (who I am as a developer)
\`\`\`

## For AI Assistants

### When to Use YouSpec

**Check specs before:**
- Writing, editing, or generating code
- Creating git commits or pull requests
- Making design/architecture decisions
- Debugging or reviewing code

**Skip YouSpec when:**
- Answering questions about YouSpec itself
- User explicitly overrides a spec in conversation
- Simply reading/analyzing existing code without changes

### How to Use

**Step 1: Discover what specs exist**
\`\`\`
Glob: ~/.youspec/specs/**/*.md
\`\`\`

**Step 2: Match specs to task**
- Code changes: read specs/coding/ and specs/architecture/
- Git operations: read specs/collaboration/git.md
- Debugging/testing: read specs/quality/
- Style decisions: read specs/personality/

Read only relevant specs. Don't read everything for simple tasks.

**Step 3: Apply specs**
Follow the specs strictly - this is the user's coding DNA.

### Precedence Rules

1. Explicit user instructions in conversation (highest)
2. CLAUDE.md global rules
3. YouSpec specs
4. General best practices (lowest)

If specs conflict with CLAUDE.md, CLAUDE.md wins.

### Handling Gaps

When you encounter a topic with NO SPEC:

1. Make a reasonable decision (bias toward simplicity)
2. Log the MISSING TOPIC to ~/.youspec/gaps.md:
   \`\`\`
   - [ ] **category/topic**: No spec for [what needs defining]
   \`\`\`
3. Continue working - don't stop to ask

**gaps.md is for MISSING SPEC TOPICS, not decisions:**
- Correct: \`- [ ] **quality/testing**: No spec for test coverage expectations\`
- Wrong: \`- Decided to use 80% coverage because...\`

**Don't log:**
- Trivial choices covered by general principles
- One-off decisions unlikely to recur
- Topics already covered by existing specs

### Creating Specs

**NEVER write specs from your assumptions.** These are the USER's preferences, not yours.

**1. Ask 10 focused questions** specific to the topic:
- Scenario-based: "When you have 3 optional parameters, do you prefer...?"
- Trade-off based: "Fast vs maintainable - which wins when...?"
- Edge cases: "What about legacy code that doesn't follow the rule?"

**2. WAIT for user answers**

**3. Synthesize into a tight spec using USER's words:**
- Lead with core principle (1 sentence)
- Rules as bullets (5-10 max)
- Inline examples: \`Bad: foo() // Good: getUserById()\`
- Under 30 lines total
- No meta-commentary or scaffolding

**4. Save to appropriate folder** in ~/.youspec/specs/

### Error Recovery

- ~/.youspec/ doesn't exist? Ask if user wants to initialize
- Specs folder empty? Offer init questionnaire (10 questions per topic)
- Can't read a spec? Skip it and continue with defaults
- Contradictory specs? Ask user which takes precedence

## Philosophy

When in doubt:

- Clear > clever
- Explicit > implicit
- Delete > comment out
- Simple > complex
- Ask > guess (for important decisions)

### When Principles Conflict

Principles guide, but vision wins:

1. **Does it work?** (correctness beats elegance)
2. **Does it match the vision?** (right complexity beats wrong simplicity)
3. **Can it be maintained?** (future you beats present you)
4. **Is it simple?** (only after 1-3 are satisfied)
`;
}

function getDefaultGapsContent() {
    return `# Gaps

Missing spec topics. When AI encounters a topic with no spec, log it here.

## What to Log

Log MISSING SPEC TOPICS, not decisions made.

**Correct:** \`- [ ] **quality/error-handling**: No spec for how to handle errors\`
**Wrong:** \`- Decided to use try-catch with logging because...\`

## Format

\`- [ ] **category/topic**: brief description of what needs a spec\`

## Workflow

1. AI logs missing topics while working
2. Periodically review accumulated gaps
3. Pick important one, AI asks 10 questions, creates spec
4. Remove the line once spec exists

---

`;
}

class SpecsProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    getParent(element) {
        if (!element || !element.resourceUri) return null;
        const parentPath = path.dirname(element.resourceUri.fsPath);
        if (parentPath === YOUSPEC_DIR) return null;

        const parentName = path.basename(parentPath);
        const item = new vscode.TreeItem(parentName, vscode.TreeItemCollapsibleState.Collapsed);
        item.contextValue = 'folder';
        item.resourceUri = vscode.Uri.file(parentPath);
        return item;
    }

    getChildren(element) {
        const directory = element ? element.resourceUri.fsPath : YOUSPEC_DIR;

        try {
            const items = fs.readdirSync(directory, { withFileTypes: true });
            return items.map(item => {
                const itemPath = path.join(directory, item.name);
                const isDirectory = item.isDirectory();

                const treeItem = new vscode.TreeItem(
                    item.name,
                    isDirectory ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None
                );

                if (isDirectory) {
                    treeItem.contextValue = 'folder';
                    treeItem.iconPath = new vscode.ThemeIcon('folder');
                } else {
                    treeItem.command = {
                        command: 'vscode.open',
                        title: 'Open Spec',
                        arguments: [vscode.Uri.file(itemPath)]
                    };
                    treeItem.contextValue = 'spec';
                    treeItem.iconPath = new vscode.ThemeIcon('file');
                }

                treeItem.resourceUri = vscode.Uri.file(itemPath);
                return treeItem;
            }).sort((a, b) => {
                if (a.contextValue === 'folder' && b.contextValue === 'spec') return -1;
                if (a.contextValue === 'spec' && b.contextValue === 'folder') return 1;
                return a.label.localeCompare(b.label);
            });
        } catch (err) {
            return [];
        }
    }
}

function getTargetDirectory(item) {
    return item?.contextValue === 'folder' ? item.resourceUri.fsPath : YOUSPEC_DIR;
}

function activate(context) {
    ensureDefaultStructure();

    const specsProvider = new SpecsProvider();
    const treeView = vscode.window.createTreeView('youspecSpecs', {
        treeDataProvider: specsProvider,
        dragAndDropController: {
            dropMimeTypes: ['application/vnd.code.tree.youspecSpecs'],
            dragMimeTypes: ['application/vnd.code.tree.youspecSpecs'],
            handleDrag(source, dataTransfer) {
                dataTransfer.set('application/vnd.code.tree.youspecSpecs', new vscode.DataTransferItem(source));
            },
            handleDrop(target, dataTransfer) {
                const transferItem = dataTransfer.get('application/vnd.code.tree.youspecSpecs');
                if (!transferItem) return;

                const source = transferItem.value;
                if (!source || source.length === 0) return;

                const sourceItem = source[0];
                const targetDir = getTargetDirectory(target);
                const sourcePath = sourceItem.resourceUri.fsPath;
                const fileName = path.basename(sourcePath);
                const newPath = path.join(targetDir, fileName);

                if (sourcePath === newPath) return;

                if (fs.existsSync(newPath)) {
                    vscode.window.showErrorMessage(`${fileName} already exists in target location`);
                    return;
                }

                try {
                    fs.renameSync(sourcePath, newPath);
                    specsProvider.refresh();
                } catch (err) {
                    vscode.window.showErrorMessage(`Failed to move: ${err.message}`);
                }
            }
        }
    });

    const watcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(YOUSPEC_DIR, '**/*')
    );

    watcher.onDidCreate(() => specsProvider.refresh());
    watcher.onDidDelete(() => specsProvider.refresh());
    watcher.onDidChange(() => specsProvider.refresh());

    let addSpec = vscode.commands.registerCommand('youspec.addSpec', async (item) => {
        const name = await vscode.window.showInputBox({
            prompt: 'Enter spec name',
            placeHolder: 'e.g., naming.md, error-handling.md'
        });

        if (!name) return;

        const parentDir = getTargetDirectory(item);
        const filePath = path.join(parentDir, name);

        if (fs.existsSync(filePath)) {
            vscode.window.showErrorMessage(`${name} already exists`);
            return;
        }

        try {
            fs.writeFileSync(filePath, getSpecTemplate(name), 'utf8');
            const doc = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(doc);
            specsProvider.refresh();
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to create spec: ${err.message}`);
        }
    });

    let addFolder = vscode.commands.registerCommand('youspec.addFolder', async (item) => {
        const name = await vscode.window.showInputBox({
            prompt: 'Enter folder name',
            placeHolder: 'e.g., coding, workflows, python'
        });

        if (!name) return;

        const parentDir = getTargetDirectory(item);
        const folderPath = path.join(parentDir, name);

        if (fs.existsSync(folderPath)) {
            vscode.window.showErrorMessage(`${name} already exists`);
            return;
        }

        try {
            fs.mkdirSync(folderPath, { recursive: true });
            specsProvider.refresh();
            vscode.window.showInformationMessage(`Folder created: ${name}`);
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to create folder: ${err.message}`);
        }
    });

    let copySpec = vscode.commands.registerCommand('youspec.copySpec', async (item) => {
        try {
            const content = fs.readFileSync(item.resourceUri.fsPath, 'utf8');
            await vscode.env.clipboard.writeText(content);
            vscode.window.showInformationMessage(`Copied: ${item.label}`);
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to copy spec: ${err.message}`);
        }
    });

    let deleteItem = vscode.commands.registerCommand('youspec.deleteItem', async (item) => {
        const itemType = item.contextValue === 'folder' ? 'folder' : 'spec';
        const result = await vscode.window.showWarningMessage(
            `Delete ${itemType} ${item.label}?`,
            'Delete', 'Cancel'
        );

        if (result === 'Delete') {
            try {
                if (item.contextValue === 'folder') {
                    fs.rmSync(item.resourceUri.fsPath, { recursive: true, force: true });
                } else {
                    fs.unlinkSync(item.resourceUri.fsPath);
                }
                specsProvider.refresh();
            } catch (err) {
                vscode.window.showErrorMessage(`Failed to delete ${itemType}: ${err.message}`);
            }
        }
    });

    let renameItem = vscode.commands.registerCommand('youspec.renameItem', async (item) => {
        const itemType = item.contextValue === 'folder' ? 'folder' : 'spec';
        const newName = await vscode.window.showInputBox({
            prompt: `Enter new ${itemType} name`,
            value: item.label
        });

        if (!newName || newName === item.label) return;

        const parentDir = path.dirname(item.resourceUri.fsPath);
        const newPath = path.join(parentDir, newName);

        if (fs.existsSync(newPath)) {
            vscode.window.showErrorMessage(`${newName} already exists`);
            return;
        }

        try {
            fs.renameSync(item.resourceUri.fsPath, newPath);
            specsProvider.refresh();
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to rename ${itemType}: ${err.message}`);
        }
    });

    let refresh = vscode.commands.registerCommand('youspec.refresh', () => {
        specsProvider.refresh();
    });

    context.subscriptions.push(addSpec, addFolder, copySpec, deleteItem, renameItem, refresh, watcher);
}

function getSpecTemplate(name) {
    const specName = name.replace('.md', '').replace(/-/g, ' ');
    return `# ${specName.charAt(0).toUpperCase() + specName.slice(1)}

[Your rule here. Be specific. Include inline examples.]

Exceptions: [when to break this rule]
`;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
