let arr = [1, 3, 5, 7, 9, 11];
let size = arr.length;
// tree 的长度一般是arr 的四倍
let tree = new Array(1000).fill(0);

// 建立一颗树
// node 编号节点
// start 节点的开始范围
// end 节点的结束范围
function build_tree(node: number, start: number, end: number) {
  if (start == end) {
    tree[node] = arr[start];
    return;
  }
  let mid = (start + end) >> 1;
  let left_node = node * 2 + 1;
  let right_node = node * 2 + 2;
  build_tree(left_node, start, mid);
  build_tree(right_node, mid + 1, end);
  tree[node] = tree[left_node] + tree[right_node];
}
// node:节点
// start:节点的开始位置
// end：节点的结束位置
// idx :将arr的index 位置 改为val
function update(
  node: number,
  start: number,
  end: number,
  idx: number,
  val: number
) {
  if (start == end) {
    arr[idx] = val;
    tree[node] = val;
    return;
  }
  let mid = (start + end) >> 1;
  let left_node = 2 * node + 1;
  let right_node = 2 * node + 2;
  if (idx >= start && idx <= mid) {
    update(left_node, start, mid, idx, val);
  } else {
    update(right_node, mid + 1, end, idx, val);
  }
  tree[node] = tree[left_node] + tree[right_node];
}
function query(
  node: number,
  start: number,
  end: number,
  L: number,
  R: number
): number {
  if (R < start || L > end) {
    return 0;
  }
  if (start == end || (L <= start && R <= end)) {
    return tree[node];
  }
  // 求L 到 R 的和
  let mid = (start + end) >> 1;
  let left_node: number = 2 * node + 1;
  let rigth_node: number = 2 * node + 2;
  let sum_left = query(left_node, start, mid, L, R);
  let sum_right = query(rigth_node, mid + 1, end, L, R);

  return sum_left + sum_right;
}

build_tree(0, 0, size - 1);
console.log(tree.slice(0, 15));
update(0, 0, size - 1, 4, 6);
console.log(tree.slice(0, 15));
const a = query(0, 0, size - 1, 2, 5);
console.log(a);
export {};
