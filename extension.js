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
    return `# YouSpec: My Digital Twin

This is ME - my coding DNA, preferences, personality. Not project specs.
It travels with me across all projects.

## Folders

- **coding/** - How I write (naming, functions, errors, comments)
- **architecture/** - How I design (organization, dependencies, state)
- **quality/** - How I ensure it works (testing, debugging, logging)
- **collaboration/** - How I work with others (git, code-review, docs)
- **process/** - How I think (problem-solving, refactoring, iteration)
- **personality/** - Who I am (aesthetics, interests, communication style)

## For AI

If specs are empty, offer to run init questionnaire (10-15 questions) to create starter specs.

1. Discover specs: use Glob tool with \`~/.youspec/specs/**/*.md\`
2. Search specs: use Grep tool with pattern on \`~/.youspec/specs/\`
3. Read only what's relevant to current task
4. If no spec exists and you had to guess, log it in gaps.md

## Creating Specs

Ask 10 simple relevant questions to understand the preference deeply. Then synthesize into a short spec.

Keep specs short. Inline examples. No labels or scaffolding.

## Philosophy

I bias toward simplicity. When in doubt:
- Clear > clever
- Delete > comment out
- Explicit > implicit
`;
}

function getDefaultGapsContent() {
    return `# Gaps

Spec backlog. When AI makes a decision without a matching spec, log it here.

Format: \`- [ ] **category/topic**: what happened, what was decided\`

When reviewed and spec created, remove the line.

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
