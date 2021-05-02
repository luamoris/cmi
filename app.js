// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const keypress = require('keypress');

const Menu = require('./src/menu');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const TITLE = 'WEBPACK BOILERPLATE SETTING';

const menu = new Menu(TITLE);

const style = menu.setList('Language for writing styles', 'style', 'css');
style.setNodeItem('CSS', 'css');
style.setNodeItem('SCSS', 'scss');
style.setNodeItem('SASS', 'sass');
style.setNodeItem('LESS', 'less');

menu.setList('First', 'first', 'one');
menu.setList('Second', 'second', 'two');

menu.setButton('Apply');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function onMenuCommand(chunk, key) {
	if (!key) return;
	let isEnd = false;

	// UP
	if (key.name === 'up') {
		menu.onUp();
	}
	// DOWN
	if (key.name === 'down') {
		menu.onDown();
	}
	// ENTER
	if (key.name === 'return') {
		const res = menu.onEnter();
		if (res === 'end') {
			isEnd = true;
			process.stdin.pause();
			console.log(menu.Config);
		}
	}
	// EXIT
	if ((key.ctrl && key.name === 'c') || (key.name === 'escape')) {
		process.stdin.pause();
	}
	// ===
	if (!isEnd) {
		console.clear();
		console.log(menu.toString());
	}
}

// ===================

function start() {
	const { stdin } = process;
	keypress(stdin);
	stdin.on('keypress', onMenuCommand);
	stdin.setRawMode(true);
	stdin.resume();
	// ===
	console.clear();
	console.log(menu.toString());
}

// ===================

start();
