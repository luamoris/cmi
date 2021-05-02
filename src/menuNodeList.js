// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const chalk = require('chalk');

const MenuNode = require('./menuNode');
const MenuNodeItem = require('./menuNodeItem');
const MenuNodeApply = require('./menuNodeApply');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class MenuNodeList extends MenuNode {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static getConfig(node) {
		const config = {};
		config.value = node.Value;
		let child = node.CNHeader;
		while (child) {
			if (child instanceof MenuNodeList) {
				config[child.Group] = MenuNodeList.getConfig(child);
			}
			child = child.NextNode;
		}
		return config;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(title, group, id) {
		super(title, id);
		this.Group = group;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	incLength() {
		this.Length++;
		return this.Length;
	}

	collectConfig() {
		const config = {};
		config.menu = this.Value;
		let child = this.CNHeader;
		while (child) {
			if (child instanceof MenuNodeList) {
				config[child.Group] = MenuNodeList.getConfig(child);
			}
			child = child.NextNode;
		}
		this.Config = config;
	}

	setNode(menuNode) {
		const node = menuNode;
		MenuNode.isNode(node);
		// ===
		node.ParentNode = this;
		if (this.CNHeader) {
			if (this.CNTail) {
				node.PrevNode = this.CNTail;
				this.CNTail.NextNode = node;
				this.CNTail = node;
			} else {
				this.CNHeader.NextNode = node;
				node.PrevNode = this.CNHeader;
				this.CNTail = node;
			}
		} else {
			this.CNHeader = node;
			this.CNTail = node;
			this.CNHover = node;
		}
		return node;
	}

	setNodeItem(title, value) {
		const index = this.incLength();
		const nodeItem = new MenuNodeItem(title, value, index);
		return this.setNode(nodeItem);
	}

	setNodeList(title, group, valDefault) {
		const index = this.incLength();
		const nodeList = new MenuNodeList(title, group, index);
		nodeList.Value = valDefault;
		return this.setNode(nodeList);
	}

	setNodeButton(title) {
		const index = this.incLength();
		const nodeButton = new MenuNodeApply(title, index);
		return this.setNode(nodeButton);
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	get Title() {
		let res = super.Title;
		res += this.Value ? chalk.grey(` (${this.Value})`) : '';
		return `${res}\n`;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	onUp() {
		if (this.CNHeader) {
			const hover = this.CNHover;
			this.CNHover = hover.PrevNode ? hover.PrevNode : hover;
		}
	}

	onDown() {
		if (this.CNHeader) {
			const hover = this.CNHover;
			this.CNHover = hover.NextNode ? hover.NextNode : hover;
		}
	}

	onEnter() {
		return this.Length ? this : this.ParentNode;
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = MenuNodeList;
