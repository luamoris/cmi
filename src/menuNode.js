// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Menu Node

const chalk = require('chalk');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class MenuNode {
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	static isNode(node) {
		if (node instanceof MenuNode) return;
		throw Error('The item data type does not match the required one.');
	}

	static createNode(title = null, id = null) {
		return {
			// data
			id,
			title,
			group: null,
			value: null,
			config: null,
			// nodes
			parent: null,
			prev: null,
			next: null,
			children: {
				head: null,
				tail: null,
				hover: null,
				length: 0,
			},
		};
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	constructor(title, id = null) {
		this.node = MenuNode.createNode(title, id);
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	toString() {
		return this.Title;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	get Header() {
		let res = `\n=== ${this.node.title} ===\n\n`;
		res = chalk.yellow.bold(res);
		return res;
	}

	get Title() {
		let res = `  ${this.node.title}`;
		if (this.ParentNode && this.ParentNode.CNHover.Id === this.Id) {
			res = chalk.cyan(`> ${res.trim()}`);
		}
		return res;
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// ID
	get Id() {
		return this.node.id;
	}

	// GROUP
	get Group() {
		return this.node.group;
	}

	set Group(group) {
		this.node.group = group;
	}

	// VALUE
	get Value() {
		return this.node.value;
	}

	set Value(value) {
		this.node.value = value;
	}

	// CONFIG
	get Config() {
		return this.node.config;
	}

	set Config(config) {
		this.node.config = config;
	}

	// PARENT NODE
	get ParentNode() {
		return this.node.parent;
	}

	set ParentNode(node) {
		MenuNode.isNode(node);
		this.node.parent = node;
	}

	// PREV NODE
	get PrevNode() {
		return this.node.prev;
	}

	set PrevNode(node) {
		MenuNode.isNode(node);
		this.node.prev = node;
	}

	// NEXT NODE
	get NextNode() {
		return this.node.next;
	}

	set NextNode(node) {
		MenuNode.isNode(node);
		this.node.next = node;
	}

	// CHILD NODE HEAD
	get CNHeader() {
		return this.node.children.head;
	}

	set CNHeader(node) {
		MenuNode.isNode(node);
		this.node.children.head = node;
	}

	// CHILD NODE TAIL
	get CNTail() {
		return this.node.children.tail;
	}

	set CNTail(node) {
		MenuNode.isNode(node);
		this.node.children.tail = node;
	}

	// CHILD NODE HOVER
	get CNHover() {
		return this.node.children.hover;
	}

	set CNHover(node) {
		MenuNode.isNode(node);
		this.node.children.hover = node;
	}

	// CHILDREN LENGTH
	get Length() {
		return this.node.children.length;
	}

	set Length(value) {
		this.node.children.length = value;
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = MenuNode;
