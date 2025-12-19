const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const os = require('os');

const SPECYOU_DIR = path.join(os.homedir(), '.specyou');

function ensureDefaultStructure() {
    if (!fs.existsSync(SPECYOU_DIR)) {
        fs.mkdirSync(SPECYOU_DIR, { recursive: true });
    }

    const specsDir = path.join(SPECYOU_DIR, 'specs');
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

    const specyouPath = path.join(SPECYOU_DIR, 'SPECYOU.md');
    if (!fs.existsSync(specyouPath)) {
        fs.writeFileSync(specyouPath, getDefaultSpecyouContent(), 'utf8');
    }

    const gapsPath = path.join(SPECYOU_DIR, 'gaps.md');
    if (!fs.existsSync(gapsPath)) {
        fs.writeFileSync(gapsPath, getDefaultGapsContent(), 'utf8');
    }
}

function getDefaultSpecyouContent() {
    return `# SpecYou - READ THIS FIRST

This is your system prompt for working with a programmer who has documented their preferences, taste, and instincts in structured specifications.

## Core Philosophy

"No one can replace a tasteful person. But a tasteful person can replace themselves."

This developer has documented WHO they are as a programmer. Your job is to write code indistinguishable from theirs by following their specs precisely.

## The Golden Rule: KNOW WHO YOU'RE CODING FOR

**Check ~/.specyou/ often.** Not just at the start - throughout your work.

\`\`\`
ls -la ~/.specyou/
grep "topic" ~/.specyou/
\`\`\`

The more you check, the better you understand this programmer's taste. The specs are their coding DNA - read them, search them, internalize them. Then write code as they would write it.

## Precedence Order

1. **User's live instructions** (current conversation)
2. **SPECYOU.md** (this file)
3. **Individual specs** in \`specs/\`

If there's conflict, higher precedence wins. If unsure, ask the user.

## Creating New Specs: The 10-Question Rule

**NEVER write a spec based on your assumptions.**

When creating a new spec:

1. **Ask 10 questions** about the topic first
2. Use the USER's answers verbatim
3. Structure using the standard spec template
4. Save to appropriate category folder

## The gaps.md File

\`gaps.md\` is for logging **MISSING SPEC TOPICS ONLY** - topics where you needed guidance but no spec existed.

**Correct entries:**
\`\`\`
- [ ] **quality/testing**: No spec for test coverage requirements
- [ ] **coding/naming**: No spec for naming constants vs variables
\`\`\`

**Wrong entries:**
\`\`\`
- Decided to use 80% test coverage because it's best practice
- Used camelCase because most projects do
\`\`\`

**Never log your decisions. Only log missing topics.**

## Empty Specs Folder Handling

If \`~/.specyou/specs/\` is empty or has no relevant specs:

1. Detect this by checking if Glob returns nothing
2. Offer initialization: "Would you like me to initialize specs with a questionnaire?"
3. If yes, ask 10 questions per topic

## Remember

- **You are not coding with "best practices"** - you are coding with THIS developer's practices
- **Your opinions don't matter** - only the specs matter
- **Check specs frequently** - not just at the start
- **When in doubt, ask** - never assume

This developer has invested time documenting their preferences. Honor that investment by following them precisely.

---

**Now go check the specs before doing anything else.**
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
        if (parentPath === SPECYOU_DIR) return null;

        const parentName = path.basename(parentPath);
        const item = new vscode.TreeItem(parentName, vscode.TreeItemCollapsibleState.Collapsed);
        item.contextValue = 'folder';
        item.resourceUri = vscode.Uri.file(parentPath);
        return item;
    }

    getChildren(element) {
        const directory = element ? element.resourceUri.fsPath : SPECYOU_DIR;

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
    return item?.contextValue === 'folder' ? item.resourceUri.fsPath : SPECYOU_DIR;
}

function activate(context) {
    ensureDefaultStructure();

    const specsProvider = new SpecsProvider();
    const treeView = vscode.window.createTreeView('specyouSpecs', {
        treeDataProvider: specsProvider,
        dragAndDropController: {
            dropMimeTypes: ['application/vnd.code.tree.specyouSpecs'],
            dragMimeTypes: ['application/vnd.code.tree.specyouSpecs'],
            handleDrag(source, dataTransfer) {
                dataTransfer.set('application/vnd.code.tree.specyouSpecs', new vscode.DataTransferItem(source));
            },
            handleDrop(target, dataTransfer) {
                const transferItem = dataTransfer.get('application/vnd.code.tree.specyouSpecs');
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
        new vscode.RelativePattern(SPECYOU_DIR, '**/*')
    );

    watcher.onDidCreate(() => specsProvider.refresh());
    watcher.onDidDelete(() => specsProvider.refresh());
    watcher.onDidChange(() => specsProvider.refresh());

    let addSpec = vscode.commands.registerCommand('specyou.addSpec', async (item) => {
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

    let addFolder = vscode.commands.registerCommand('specyou.addFolder', async (item) => {
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

    let copySpec = vscode.commands.registerCommand('specyou.copySpec', async (item) => {
        try {
            const content = fs.readFileSync(item.resourceUri.fsPath, 'utf8');
            await vscode.env.clipboard.writeText(content);
            vscode.window.showInformationMessage(`Copied: ${item.label}`);
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to copy spec: ${err.message}`);
        }
    });

    let deleteItem = vscode.commands.registerCommand('specyou.deleteItem', async (item) => {
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

    let renameItem = vscode.commands.registerCommand('specyou.renameItem', async (item) => {
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

    let refresh = vscode.commands.registerCommand('specyou.refresh', () => {
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
