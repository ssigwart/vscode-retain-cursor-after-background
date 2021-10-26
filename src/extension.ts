import * as vscode from 'vscode';

/**
 * Activate
 */
 export function activate(context: vscode.ExtensionContext)
 {
	// Record selection on blur and restore when focused back again
	let windowFocused = false;
	let selectionsOnBlur: vscode.Selection[] | undefined = undefined;
	let lastUri: vscode.Uri | undefined = undefined;
	context.subscriptions.push(vscode.window.onDidChangeWindowState((e: vscode.WindowState): any => {
		windowFocused = e.focused;
		if (!windowFocused)
		{
			selectionsOnBlur = vscode.window.activeTextEditor?.selections;
			lastUri = vscode.window.activeTextEditor?.document.uri;
		}
	}));
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection((e: vscode.TextEditorSelectionChangeEvent): any => {
		if (!windowFocused && selectionsOnBlur !== undefined)
		{
			if (e.kind === vscode.TextEditorSelectionChangeKind.Mouse)
			{
				if (lastUri === e.textEditor.document.uri)
					e.textEditor.selections = selectionsOnBlur;
				lastUri = undefined;
			}
		}
	}));
}

/**
 * Deactivate
 */
export function deactivate()
{}
