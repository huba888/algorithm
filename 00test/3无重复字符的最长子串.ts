class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function maximumAverageSubtree(root: TreeNode | null): number {
  // 中序遍历 和 前序遍历 加 前缀和 优化
  let inOrder: number[] = [];
  let preOrder: number[] = [];
  function dfs(node: TreeNode | null) {
    if (node) {
      dfs(node.left);
      inOrder.push(node.val);
      dfs(node.right);
    }
  }
  function dfs2(node: TreeNode | null) {
    if (node) {
      preOrder.push(node.val);
      dfs(node.left);
      dfs(node.right);
    }
  }
  dfs(root);
  dfs2(root);
  // 给我一个 前序遍历和中序边遍历我返回一个值给你
  function getAvg(inOrder: number[], preOrder: number[]): number {
    if (inOrder.length == 0) {
      return 0;
    }
    let index = inOrder.indexOf(preOrder[0]);
    let count = inOrder.length;
    let sum = inOrder.reduce((a, b) => a + b, 0);
    let leftInOrder = inOrder.slice(0, index);
    let rightInOrder = inOrder.slice(index + 1);
    let leftPreOrder = preOrder.slice(1, index + 1);
    let rightPreOrder = preOrder.slice(index + 1);
    return Math.max(
      sum / count,
      getAvg(leftInOrder, leftPreOrder),
      getAvg(rightInOrder, rightPreOrder)
    );
  }
  return getAvg(inOrder, preOrder);
}
let node = new TreeNode();

node.val = 5;
node.left = new TreeNode(6);
node.right = new TreeNode(1);

maximumAverageSubtree(node);
