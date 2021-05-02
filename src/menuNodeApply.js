// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const chalk = require('chalk');

const MenuNode = require('./menuNode');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class MenuNodeApply extends MenuNode {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	get Title() {
		let res = `  ${this.node.title}`;
		if (this.ParentNode && this.ParentNode.CNHover.Id === this.Id) {
			res = chalk.green(`+ ${res.trim()}`);
		}
		return `  ----------\n${res}\n`;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	onEnter() {
		const parent = this.ParentNode;
		if (parent) {
			parent.collectConfig();
			return parent;
		}
		throw Error('The element has no parent');
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = MenuNodeApply;
