const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this.tree = null
    }

    root() {
        return this.tree
    }

    add(data) {
        let newData = new Node(data)
        if (this.tree === null) {
            this.tree = newData
            return this
        }
        let current = this.tree
        while (current) {
            if (data === current.data) {
                return undefined
            } else if (data < current.data) {
                if (current.left === null) {
                    current.left = newData;
                    return this
                }
                current = current.left
            } else {
                if (current.right === null) {
                    current.right = newData
                    return this
                }
                current = current.right;
            }
        }
    }

    has(data) {
        return getNode(this.tree, data);

        function getNode(node, data) {
            if (!node) {
                return false;
            }
            if (node.data === data) {
                return true;
            }
            if (data < node.data) {
                return getNode(node.left, data);
            } else {
                return getNode(node.right, data);
            }
        }

    }

    find(data) {
        if (!this.tree) {
            return false
        }
        let current = this.tree
        let found = false
        while (current && !found) {
            if (data < current.data) {
                current = current.left
            } else if (data > current.data) {
                current = current.right
            } else {
                found = current
            }
        }
        if (!found) return undefined
        return found
    }

    remove(data) {
        this.tree = this.removeNode(this.tree, data)

    }

    removeNode(current, data) {
        if (current === null) return current
        if (data === current.data) {
            if (current.left === null && current.right === null) {
                return null
            } else if (current.left === null) {
                return current.right
            } else if (current.right === null) {
                return current.left
            } else {
                let tempNode = this.smallestNode(current.right)
                current.data = tempNode.data

                current.right = this.removeNode(current.right, tempNode.data)
                return current
            }
        } else if (data < current.data) {
            current.left = this.removeNode(current.left, data)
            return current
        } else {
            current.right = this.removeNode(current.right, data)
            return current
        }
    }

    smallestNode(node) {
        while (!node.left === null)
            node = node.left

        return node
    }

    min() {
        let node = this.tree;
        while (node.left) {
            node = node.left;
        }

        return node.data;

    }

    max() {
        let node = this.tree;
        while (node.right) {
            node = node.right;
        }

        return node.data;

    }
}

module.exports = {
    BinarySearchTree
};