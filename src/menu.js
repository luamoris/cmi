// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const MenuNodeList = require('./menuNodeList');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class Menu {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(title) {
		this.menu = new MenuNodeList(title, 'menu', '');
		this.current = this.menu;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	get Config() {
		return this.menu.Config;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	toString() {
		let res = this.current.Header;
		let child = this.current.CNHeader;
		while (child) {
			res += child.toString();
			child = child.NextNode;
		}
		return res;
	}

	setList(title, group, valDefault) {
		return this.menu.setNodeList(title, group, valDefault);
	}

	setButton(title) {
		this.menu.setNodeButton(title);
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	onUp() {
		this.current.onUp();
	}

	onDown() {
		this.current.onDown();
	}

	onEnter() {
		const hover = this.current.CNHover;
		if (hover) {
			this.current = hover.onEnter();
			return this.menu.Config ? 'end' : null;
		}
		return null;
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = Menu;
