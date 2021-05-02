// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const chalk = require('chalk');

const MenuNode = require('./menuNode');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class MenuNodeItem extends MenuNode {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(title, value, id) {
		super(title, id);
		this.Value = value;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	get Title() {
		let res = `  ${this.node.title}`;
		if (this.ParentNode && this.ParentNode.CNHover.Id === this.Id) {
			res = chalk.green(`+ ${res.trim()}`);
		}
		return `${res}\n`;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	onEnter() {
		const parent = this.ParentNode;
		if (parent) {
			parent.Value = this.Value;
			return parent.ParentNode ? parent.ParentNode : parent;
		}
		throw Error('The element has no parent');
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = MenuNodeItem;
