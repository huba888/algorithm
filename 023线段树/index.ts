// 线段树 区间操作和统计的利器
const a = [
  1, 2, 34, 5, 1, 23, 5, 165, 1235, 51, 351, 2512, 35612, 354, 12, 351, 253, 12,
  53, 1235, 1, 235, 1, 235, 1235, 12, 351, 2356, 3457, 3, 75, 34, 873, 2, 4521,
  54, 123, 412, 341, 516, 3457, 37, 3, 457, 3457, 34, 5734, 82, 3451, 34, 1, 3,
  41, 252135, 1,
];
let n = a.length;
// 线段树数组 必须是原来数组的4倍
const tree = new Array(n * 4).fill(0);
function build(p: number, l: number, r: number) {
  if (l === r) {
    tree[p] = a[l];
    return 0;
  }
  let mid = (l + r) >> 1;
  build(p * 2, l, mid);
  build(p * 2 + 1, mid + 1, r);
  tree[p] = tree[p * 2] + tree[p * 2 + 1];
}
function add(p: number, l: number, r: number, x: number, num: number) {
  if (l == r) {
    tree[p] += num;
    return;
  }
  let mid = (l + r) >> 1;
  if (x <= mid) {
    add(p * 2, l, mid, x, num);
  } else {
    add(p * 2 + 1, mid + 1, r, x, num);
  }
  tree[p] = tree[p * 2] + tree[p * 2 + 1];
}
function find(p: number, l: number, r: number, x: number, y: number) {
  if (x <= l && r <= y) {
    return tree[p];
  }
  let mid = (l + r) >> 1;
  if (y <= mid) return find(p * 2, l, mid, x, y);
  if (x > mid) return find(p * 2 + 1, mid + 1, r, x, y);
  return find(p * 2, l, mid, x, mid) + find(p * 2 + 1, mid + 1, r, mid + 1, y);
}
