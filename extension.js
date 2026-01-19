const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const os = require('os');

const SPECYOU_DIR = path.join(os.homedir(), '.specyou');

function getTemplatePath(filename) {
    return path.join(__dirname, 'templates', filename);
}

function readTemplate(filename) {
    try {
        return fs.readFileSync(getTemplatePath(filename), 'utf8');
    } catch (err) {
        console.error(`Failed to read template ${filename}:`, err.message);
        return '';
    }
}

function ensureDefaultStructure() {
    if (!fs.existsSync(SPECYOU_DIR)) {
        fs.mkdirSync(SPECYOU_DIR, { recursive: true });
    }

    const specsDir = path.join(SPECYOU_DIR, 'specs');
    const folders = [
        path.join(specsDir, 'app-development'),
        path.join(specsDir, 'coding'),
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
        fs.writeFileSync(specyouPath, readTemplate('specyou-default.md'), 'utf8');
    }

    const gapsPath = path.join(SPECYOU_DIR, 'gaps.md');
    if (!fs.existsSync(gapsPath)) {
        fs.writeFileSync(gapsPath, readTemplate('gaps-default.md'), 'utf8');
    }
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
            const items = fs.readdirSync(directory, { withFileTypes: true })
                .filter(item => !item.name.startsWith('.'));
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

function getAllFiles(directory, files = []) {
    const items = fs.readdirSync(directory, { withFileTypes: true });
    for (const item of items) {
        if (item.name.startsWith('.')) continue;
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
            getAllFiles(fullPath, files);
        } else {
            files.push(fullPath);
        }
    }
    return files;
}

function searchInFiles(query) {
    const results = [];
    const files = getAllFiles(SPECYOU_DIR);
    const lowerQuery = query.toLowerCase();

    for (const filePath of files) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n');

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].toLowerCase().includes(lowerQuery)) {
                    const relativePath = path.relative(SPECYOU_DIR, filePath);
                    const linePreview = lines[i].trim().substring(0, 60);
                    results.push({
                        label: `$(file) ${relativePath}:${i + 1}`,
                        description: linePreview,
                        filePath,
                        line: i
                    });
                }
            }
        } catch (err) {
            // Skip files that can't be read
        }
    }
    return results;
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

    let updateSpecyou = vscode.commands.registerCommand('specyou.updateSpecyou', async () => {
        const result = await vscode.window.showWarningMessage(
            'This will overwrite SPECYOU.md with the latest default template. Your specs will not be touched.',
            'Update', 'Cancel'
        );

        if (result === 'Update') {
            try {
                const specyouPath = path.join(SPECYOU_DIR, 'SPECYOU.md');
                fs.writeFileSync(specyouPath, readTemplate('specyou-default.md'), 'utf8');
                const doc = await vscode.workspace.openTextDocument(specyouPath);
                await vscode.window.showTextDocument(doc);
                vscode.window.showInformationMessage('SPECYOU.md reset to default');
            } catch (err) {
                vscode.window.showErrorMessage(`Failed to reset: ${err.message}`);
            }
        }
    });

    let search = vscode.commands.registerCommand('specyou.search', async () => {
        const quickPick = vscode.window.createQuickPick();
        quickPick.placeholder = 'Search in specyou...';
        quickPick.matchOnDescription = true;

        quickPick.onDidChangeValue(value => {
            if (value.length < 2) {
                quickPick.items = [];
                return;
            }
            quickPick.items = searchInFiles(value);
        });

        quickPick.onDidAccept(() => {
            const selected = quickPick.selectedItems[0];
            if (selected) {
                const uri = vscode.Uri.file(selected.filePath);
                vscode.window.showTextDocument(uri).then(editor => {
                    const position = new vscode.Position(selected.line, 0);
                    editor.selection = new vscode.Selection(position, position);
                    editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenter);
                });
            }
            quickPick.hide();
        });

        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
    });

    context.subscriptions.push(addSpec, addFolder, copySpec, deleteItem, renameItem, updateSpecyou, search, watcher);
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
