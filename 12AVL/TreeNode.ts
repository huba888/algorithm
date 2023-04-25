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

export default TreeNode;
