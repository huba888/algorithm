let arr = [1, 1, 0, 4, 0, 0, 5, 6, 7];
// 维护区间最小值和最小值的个数
let n = arr.length;
// 当前节点多代表的区间 的 每个数都要加上tag
let tag = new Array(4 * n).fill(0);
// 当前节点所代表的区间 的 最小值
let min = new Array(4 * n).fill(0);
// 当前节点所代表的区间 的 最小值的个数
let cnt = new Array(4 * n).fill(0);

function build(l: number, r: number, p: number) {
  if (l == r) {
    min[p] = arr[r];
    console.log(p);
    cnt[p] = 1;
    return;
  }
  let mid = (l + r) >> 1;
  build(l, mid, 2 * p + 1);
  build(mid + 1, r, 2 * p + 2);
  update(p);
}
// 如何合并两个子节点的信息 (上传函数)
function update(p: number) {
  if (min[2 * p + 1] == min[2 * p + 2]) {
    // 左右子树的最小值是相同的
    min[p] = min[2 * p + 1];
    cnt[p] = cnt[2 * p + 1] + cnt[2 * p + 2];
  } else {
    if (min[2 * p + 1] < min[2 * p + 2]) {
      min[p] = min[2 * p + 1];
      cnt[p] = cnt[2 * p + 1];
    } else {
      min[p] = min[2 * p + 2];
      cnt[p] = cnt[2 * p + 2];
    }
  }
}
// tag 如何往下传
function down(p: number) {
  if (tag[p] !== 0) {
    tag[2 * p + 1] = tag[p];
    tag[2 * p + 2] = tag[p];
    min[2 * p + 1] += tag[p];
    min[2 * p + 2] += tag[p];
    tag[p] = 0;
  }
}
// 区间加操作
function change(
  l: number,
  r: number,
  p: number,
  A: number,
  B: number,
  val: number
) {
  if (A <= l && r <= B) {
    min[p] += val;
    tag[p] += val;
    return;
  }
  down(p);
  let mid = (l + r) >> 1;
  if (A <= mid) change(l, mid, 2 * p + 1, A, B, val);
  if (mid < B) change(mid + 1, r, 2 * p + 2, A, B, val);
  update(p);
}
function query(
  l: number,
  r: number,
  p: number,
  A: number,
  B: number
): [number, number] {
  if (A <= l && r <= B) {
    return [min[p], cnt[p]];
  }
  down(p);
  let mid = (r + l) >> 1;
  let res: [number, number] = [Infinity, 0];
  if (A <= mid) {
    let temp = query(l, mid, 2 * p + 1, A, B);
    if (temp[0] < res[0]) {
      res = temp;
    }
  }
  if (mid < B) {
    let temp = query(mid + 1, r, 2 * p + 2, A, B);
    if (res[0] == temp[0]) {
      res[0] = res[1] + temp[1];
    } else if (temp[0] < res[0]) {
      res = temp;
    }
  }
  return res;
}
build(0, n - 1, 0);
console.log(query(0, n - 1, 0, 0, n - 1));
export {};
