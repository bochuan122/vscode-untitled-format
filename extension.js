// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const XMLFormatter = require('./xmlformatter');
const JsonFormatter = require('./jsonformatter');

//Build a range of the entire document!
function getRange(document) {
	return new vscode.Range(
		// line 0, char 0:
		0, 0,
		// last line:
		document.lineCount - 1,
		// last character:
		document.lineAt(document.lineCount - 1).range.end.character
	)
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-plugin-example" is now active!');

	// formatter instance
	const xformatter = new XMLFormatter();
	const jformatter = new JsonFormatter();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerTextEditorCommand('vscode-untitled-format.format', function (textEditor, edit) {
		// The code you place here will be executed every time your command is executed
		let text = textEditor.document.getText().trim();
		// console.log(text);

		xformatter.update(text);
		// vscode.window.setStatusBarMessage("xml" + (xformatter.isXML() == true));
		if (xformatter.isXML() == true) {
			// @ts-ignore
			text = xformatter.format();
			edit.replace(getRange(textEditor.document), text);
			return;
		}

		jformatter.update(text);
		// vscode.window.setStatusBarMessage("json" + (jformatter.isJSON() == true));
		if (jformatter.isJSON() == true) {
			// @ts-ignore
			text = jformatter.format();
			edit.replace(getRange(textEditor.document), text);
			return;
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
