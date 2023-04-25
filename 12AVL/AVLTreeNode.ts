import TreeNode from "./TreeNode";

class AVLTreeNode<T> extends TreeNode<T> {
  left: AVLTreeNode<T> | null = null;
  right: AVLTreeNode<T> | null = null;
  parent: AVLTreeNode<T> | null = null;
  // 获取一个节点的高度
  private getHeight(): number {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;
    return Math.max(leftHeight, rightHeight) + 1;
  }
  // 获取一个节点的平衡因子 谁不平衡谁旋转 权值大于 1 就是不平衡
  private getBalanceFactor(): number {
    const leftBalanceFactor = this.left ? this.left.getHeight() : 0;
    const rightBalanceFactor = this.right ? this.right.getHeight() : 0;
    return Math.abs(leftBalanceFactor - rightBalanceFactor);
  }
  // 节点是否平衡
  get isBalanced(): boolean {
    return this.getBalanceFactor() > 1;
  }
  get higherChild(): AVLTreeNode<T> | null {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;
    if (leftHeight > rightHeight) {
      return this.left;
    }
    if (leftHeight < rightHeight) {
      return this.right;
    }
    return this.isLeft ? this.left : this.right;
  }
}
