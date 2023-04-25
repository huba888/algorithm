// 建立线段树
let arr = [1, 3, 5, 7, 9, 11];

let n = arr.length;
let tree = new Array(n * 4).fill(0);
// tag 表示,当前区间每个数都需要加上的值
let tag = new Array(n * 4).fill(0);

// 构建l 到 r 的区间 他的节点是p
function build(l: number, r: number, p: number) {
  if (l == r) {
    tree[p] = arr[l];
    return;
  }
  let mid = (l + r) >> 1;
  build(l, mid, p * 2 + 1);
  build(mid + 1, r, p * 2 + 2);
  tree[p] = tree[p * 2 + 1] + tree[p * 2 + 2];
}
// 我们要查询的是A 到 B的区间
function query(A: number, B: number, l: number, r: number, p: number) {
  // 如果 A B 把 l ,r 全包住了就直接返回
  if (A <= l && r <= B) {
    return tree[p];
  }
  let mid = (l + r) >> 1;
  let ans = 0;
  down(l, r, p);
  if (A <= mid) {
    ans += query(A, B, l, mid, 2 * p + 1);
  }
  if (B >= mid + 1) {
    ans += query(A, B, mid + 1, r, 2 * p + 2);
  }
  return ans;
}
function add(
  A: number,
  B: number,
  val: number,
  l: number,
  r: number,
  p: number
) {
  if (A <= l && r <= B) {
    tag[p] += val;
    tree[p] += (r - l + 1) * tag[p];
    return;
  }
  down(l, r, p);
  let mid = (r + l) >> 1;
  if (A <= mid) {
    add(A, B, val, l, mid, 2 * p + 1);
  }
  if (B >= mid + 1) {
    add(A, B, val, mid + 1, r, 2 * p + 2);
  }
  tree[p] = tree[2 * p + 1] + tree[2 * p + 2];
}
function down(l: number, r: number, p: number) {
  let mid = (l + r) >> 1;
  if (tag[p] > 0) {
    tag[p * 2 + 1] += tag[p];
    tag[p * 2 + 2] += tag[p];
    tree[p * 2 + 1] += (mid - l + 1) * tag[p];
    tree[p * 2 + 2] += (r - mid) * tag[p];
    tag[p] = 0;
  }
}
build(0, n - 1, 0);
console.log(query(0, 2, 0, n - 1, 0));
add(0, 1, 2, 0, n - 1, 0);
console.log(query(0, 2, 0, n - 1, 0));
export {};
