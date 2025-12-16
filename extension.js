const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const os = require('os');

const YOUSPEC_DIR = path.join(os.homedir(), '.youspec');

function ensureDefaultStructure() {
    if (!fs.existsSync(YOUSPEC_DIR)) {
        fs.mkdirSync(YOUSPEC_DIR, { recursive: true });
    }

    const skillsDir = path.join(YOUSPEC_DIR, 'skills');
    const codingDir = path.join(skillsDir, 'coding');
    const workflowsDir = path.join(skillsDir, 'workflows');

    if (!fs.existsSync(skillsDir)) {
        fs.mkdirSync(skillsDir, { recursive: true });
    }
    if (!fs.existsSync(codingDir)) {
        fs.mkdirSync(codingDir, { recursive: true });
    }
    if (!fs.existsSync(workflowsDir)) {
        fs.mkdirSync(workflowsDir, { recursive: true });
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
    return `# YouSpec: My Coding DNA

My coding preferences live in ~/.youspec/skills/

## How to Use

1. Discover skills: \`ls -R ~/.youspec/skills/\` or \`find ~/.youspec -name "*.md"\`
2. Search by topic: \`grep -r "keyword" ~/.youspec/skills/\`
3. Read relevant skills: \`cat ~/.youspec/skills/coding/naming.md\`
4. Load only what's relevant to your current task
5. If no skill exists and you had to guess, log it in gaps.md

## Philosophy

I bias toward simplicity. When in doubt:
- Fewer abstractions > more abstractions
- Clear > clever
- Delete > comment out
- Explicit > implicit

## Managing Skills

- CREATE: \`~/.youspec/skills/category/name.md\`
- UPDATE: Edit the file directly
- DELETE: Remove the file
`;
}

function getDefaultGapsContent() {
    return `# Gaps

When AI encounters a decision without a matching skill, log it here.

## Format

\`\`\`
## [Date] - [Topic]
Context: What were you doing?
Decision: What did you decide?
Question: What skill would have helped?
\`\`\`

## Log

`;
}

class SkillsProvider {
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
                    isDirectory ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
                );

                if (isDirectory) {
                    treeItem.contextValue = 'folder';
                    treeItem.iconPath = new vscode.ThemeIcon('folder');
                } else {
                    treeItem.command = {
                        command: 'vscode.open',
                        title: 'Open Skill',
                        arguments: [vscode.Uri.file(itemPath)]
                    };
                    treeItem.contextValue = 'skill';
                    treeItem.iconPath = new vscode.ThemeIcon('file');
                }

                treeItem.resourceUri = vscode.Uri.file(itemPath);
                return treeItem;
            }).sort((a, b) => {
                if (a.contextValue === 'folder' && b.contextValue === 'skill') return -1;
                if (a.contextValue === 'skill' && b.contextValue === 'folder') return 1;
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

    const skillsProvider = new SkillsProvider();
    const treeView = vscode.window.createTreeView('youspecSkills', {
        treeDataProvider: skillsProvider,
        dragAndDropController: {
            dropMimeTypes: ['application/vnd.code.tree.youspecSkills'],
            dragMimeTypes: ['application/vnd.code.tree.youspecSkills'],
            handleDrag(source, dataTransfer) {
                dataTransfer.set('application/vnd.code.tree.youspecSkills', new vscode.DataTransferItem(source));
            },
            handleDrop(target, dataTransfer) {
                const transferItem = dataTransfer.get('application/vnd.code.tree.youspecSkills');
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
                    skillsProvider.refresh();
                } catch (err) {
                    vscode.window.showErrorMessage(`Failed to move: ${err.message}`);
                }
            }
        }
    });

    const watcher = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(YOUSPEC_DIR, '**/*')
    );

    watcher.onDidCreate(() => skillsProvider.refresh());
    watcher.onDidDelete(() => skillsProvider.refresh());
    watcher.onDidChange(() => skillsProvider.refresh());

    let addSkill = vscode.commands.registerCommand('youspec.addSkill', async (item) => {
        const name = await vscode.window.showInputBox({
            prompt: 'Enter skill name',
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
            fs.writeFileSync(filePath, getSkillTemplate(name), 'utf8');
            const doc = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(doc);
            skillsProvider.refresh();
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to create skill: ${err.message}`);
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
            skillsProvider.refresh();
            vscode.window.showInformationMessage(`Folder created: ${name}`);
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to create folder: ${err.message}`);
        }
    });

    let copySkill = vscode.commands.registerCommand('youspec.copySkill', async (item) => {
        try {
            const content = fs.readFileSync(item.resourceUri.fsPath, 'utf8');
            await vscode.env.clipboard.writeText(content);
            vscode.window.showInformationMessage(`Copied: ${item.label}`);
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to copy skill: ${err.message}`);
        }
    });

    let deleteItem = vscode.commands.registerCommand('youspec.deleteItem', async (item) => {
        const itemType = item.contextValue === 'folder' ? 'folder' : 'skill';
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
                skillsProvider.refresh();
            } catch (err) {
                vscode.window.showErrorMessage(`Failed to delete ${itemType}: ${err.message}`);
            }
        }
    });

    let renameItem = vscode.commands.registerCommand('youspec.renameItem', async (item) => {
        const itemType = item.contextValue === 'folder' ? 'folder' : 'skill';
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
            skillsProvider.refresh();
        } catch (err) {
            vscode.window.showErrorMessage(`Failed to rename ${itemType}: ${err.message}`);
        }
    });

    let refresh = vscode.commands.registerCommand('youspec.refresh', () => {
        skillsProvider.refresh();
    });

    context.subscriptions.push(addSkill, addFolder, copySkill, deleteItem, renameItem, refresh, watcher);
}

function getSkillTemplate(name) {
    const skillName = name.replace('.md', '').replace(/-/g, ' ');
    return `# ${skillName.charAt(0).toUpperCase() + skillName.slice(1)}

## Preference
[Describe your preference in 1-2 sentences]

## Why
[Why do you prefer this?]

## Examples

Good:
- example1
- example2

Bad:
- bad-example1
- bad-example2

## Exceptions
- [When to break this rule]
`;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
