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
function deserialize(data: string): TreeNode | null {
  if (data == "") return null;
  let arr = JSON.parse(data);
  // 2 * index + 1 左子节点
  // 2 * index + 2 右子节点
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == null) continue;
    let node: TreeNode | null = null;
    if (map.has(i)) {
      node = map.get(i);
    } else {
      node = new TreeNode(arr[i]);
      map.set(i, node);
    }
    let leftIndex = 2 * i + 1;
    if (leftIndex < arr.length) {
      let leftNode: TreeNode | null = null;
      if (arr[leftIndex] != null) {
        leftNode = new TreeNode(arr[leftIndex]);
        map.set(2 * i + 1, leftNode);
      }
      node!.left = leftNode;
    }
    let rightIndex = 2 * i + 2;
    if (rightIndex < arr.length) {
      let rightNode: TreeNode | null = null;
      if (arr[rightIndex] != null) {
        rightNode = new TreeNode(arr[rightIndex]);
        map.set(2 * i + 2, rightNode);
      }
      node!.right = rightNode;
    }
  }
  return map.get(0);
}
function serialize(root: TreeNode | null): string {
  if (root == null) return "";
  let res: (number | null)[] = [];
  let queue: (null | TreeNode)[] = [root];
  while (queue.length) {
    let len = queue.length;
    // check
    // 检查队列是否全为空
    let flag = queue.some((v) => v !== null);
    if (flag == false) break;
    while (len--) {
      let node = queue.shift();
      res.push(node ? node.val : null);
      queue.push(node ? node.left : null);
      queue.push(node ? node.right : null);
    }
  }
  return JSON.stringify(res);
}
let str = "[1,2,3,null,null,4,5,null,null,3,2,2,4]";
console.log(serialize(deserialize(str)) == str);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
