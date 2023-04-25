import Node from "../types/INode";
class TreeNode<T> extends Node<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  parent: TreeNode<T> | null = null;
  get isLeft(): boolean {
    return !!(this.parent && this.parent.left == this);
  }
  get isRight(): boolean {
    return !!(this.parent && this.parent.right == this);
  }
}
class BSTree<T> {
  private root: TreeNode<T> | null = null;
  insert(value: T) {
    // 创建一个新节点
    const newNode = new TreeNode<T>(value);
    // 判断是否有根节点
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value < node.value) {
      //去左边查找空白位置
      if (node.left === null) {
        // Node节点的左边已经空白
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
  preOrderTraverse() {
    let res = this.preOrderTraverseNode(this.root, []);
    return res;
  }
  private preOrderTraverseNode(node: TreeNode<T> | null, arr: T[]) {
    if (!node) return;
    arr.push(node.value);
    this.preOrderTraverseNode(node.left, arr);
    this.preOrderTraverseNode(node.right, arr);
    return arr;
  }
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root, []);
  }
  private inOrderTraverseNode(node: TreeNode<T> | null, arr: T[]) {
    if (node) {
      this.inOrderTraverseNode(node.left, arr);
      arr.push(node.value);
      this.inOrderTraverseNode(node.right, arr);
    }
    return arr;
  }
  postOrderTraverse() {
    return this.postOrderTraverseNode(this.root, []);
  }
  postOrderTraverseNode(node: TreeNode<T> | null, arr: T[]) {
    if (node) {
      this.postOrderTraverseNode(node.left, arr);
      this.postOrderTraverseNode(node.right, arr);
      arr.push(node.value);
    }
    return arr;
  }
  // 非递归方式实现 先序遍历 Recursion 递归
  preOrderTraverseNoRecursion() {
    let res: T[] = [];
    if (this.root === null) return res;
    let stack: TreeNode<T>[] = [this.root];
    while (stack.length > 0) {
      let current = stack.pop()!;
      res.push(current?.value);
      current.right && stack.push(current.right);
      current.left && stack.push(current.left);
    }
    return res;
  }
  // 层序遍历
  levelOrderTraverse() {
    if (this.root === null) return;
    let queue: TreeNode<T>[] = [this.root];
    let res: T[] = [];
    while (queue.length) {
      const current = queue.shift()!;
      res.push(current.value);
      current.left && queue.push(current.left);
      current.right && queue.push(current.right);
    }
    return res;
  }
  // 获取最大值
  getMaxValue(): T | null {
    let current: TreeNode<T> | null = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current?.value ?? null;
  }
  getMinValue(): T | null {
    let current: TreeNode<T> | null = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current?.value ?? null;
  }
  search(value: T): boolean {
    return !!this.searchNode(value);
  }
  private searchNode(value: T): TreeNode<T> | null {
    let current = this.root;
    let parent: TreeNode<T> | null = null;
    while (current) {
      if (current.value === value) {
        return current;
      }
      parent = current;
      if (current.value < value) {
        current = current.right;
      } else {
        current = current.right;
      }
      if (current) current.parent = parent;
    }
    return null;
  }
  private getSuccessor(delNode: TreeNode<T>) {
    // 获取右子树
    let current = delNode.right;
    let successor: TreeNode<T> | null = null;
    while (current) {
      successor = current;
      current = current.left;
      if (current) {
        current.parent = successor;
      }
    }
    if (successor !== delNode.right) {
      successor!.parent!.left = successor!.right;
      successor!.right = delNode.right;
    }
    // 拿到了后继节点
    return successor;
  }
  remove(value: T): boolean {
    // 先先去搜索当前节点是否存在
    let current = this.searchNode(value);
    if (!current) return false;
    // 当前节点是否是一个叶子节点 没有左节点,也没有右节点
    if (current.left === null && current.right === null) {
      if (current === this.root) {
        this.root = null;
      } else if (current.isLeft) {
        current.parent!.left = null;
      } else {
        current.parent!.right = null;
      }
    }
    // 只有左子节点
    else if (current.right == null) {
      // 是一个根节点
      if (current === this.root) {
        this.root = current.left;
      }
      // 不是根节点 自己是一个左节点 将父节点的左节点 变为我的左节点
      else if (current.isLeft) {
        current.parent!.left = current.left;
      } else {
        current.parent!.right = current.left;
      }
    }
    // 只有一个子节点,只有右节点
    else if (current.left === null) {
      // 是一个根节点
      if (current === this.root) {
        this.root = current.right;
      }
      // 不是根节点 自己是一个左节点 将父节点的左节点 变为我的右节点
      else if (current.isLeft) {
        current.parent!.left = current.right;
      } else {
        current.parent!.right = current.right;
      }
    }
    // 有两个子节点 找前驱或者后继
    else {
      const successor = this.getSuccessor(current);
      if (current === this.root) {
        this.root = successor;
      } else if (current.isLeft) {
        current.parent!.left = successor;
      } else {
        current.parent!.right = successor;
      }
    }
    //
    return false;
  }
}
const bst = new BSTree<number>();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(3);
bst.insert(6);
bst.insert(13);
bst.insert(20);
bst.insert(12);
bst.insert(14);
bst.insert(18);
bst.insert(25);
console.log(bst.preOrderTraverse());
console.log(bst.levelOrderTraverse());
console.log(bst.getMaxValue());
console.log(bst.getMinValue());
console.log(bst.search(1));
console.log(bst.search(25));
bst.remove(25);
bst.remove(11);

const num = 1;

let num2 = 1;

export {};
