let arr = [1, 3, 2, 34, 12, 51, 235, 1, 235, 12];
let n = arr.length;
let max = new Array(4 * n).fill(0);
let tag = new Array(4 * n).fill(0);
// 更新函数
function update(p: number) {
  max[p] = Math.max(max[2 * p + 1], max[2 * p + 2]);
}
function build(l: number, r: number, p: number) {
  if (l == r) {
    max[p] = arr[l];
    return;
  }
  let mid = (l + r) >> 1;
  build(l, mid, 2 * p + 1);
  build(mid + 1, r, 2 * p + 2);
  update(p);
}
function down(p: number) {
  if (tag[p] !== 0) {
    tag[2 * p + 1] = tag[p];
    tag[2 * p + 2] = tag[p];
    max[2 * p + 1] += tag[p];
    max[2 * p + 2] += tag[p];
    tag[p] = 0;
  }
}
function change(
  l: number,
  r: number,
  p: number,
  A: number,
  B: number,
  val: number
) {
  if (A <= l && r <= B) {
    max[p] += val;
    tag[p] += val;
    return;
  }
  let mid = (l + r) >> 1;
  down(p);
  if (A <= mid) {
    change(l, mid, 2 * p + 1, A, B, val);
  }
  if (mid < B) {
    change(mid + 1, r, 2 * p + 2, A, B, val);
  }
  update(p);
}
function query(l: number, r: number, p: number, A: number, B: number) {
  if (l == r) {
    return max[p];
  }
  let mid = (l + r) >> 1;
  let res = -Infinity;
  if (A <= mid) {
    res = Math.max(res, query(l, mid, 2 * p + 1, A, B));
  }
  if (mid < B) {
    res = Math.max(res, query(mid + 1, r, 2 * p + 2, A, B));
  }
  return res;
}
build(0, n - 1, 0);
change(0, n - 1, 0, 1, 3, 2);
for (let i = 0; i < 100000; i++) {
  let min = Math.floor(Math.random() * n);
  let max = Math.floor(Math.random() * n);
  if (min > max) {
    [min, max] = [min, max];
  }
  let flag =
    query(0, n - 1, 0, min, max) == Math.max(...arr.slice(min, max + 1));
  if (flag == false) {
    console.log(
      query(0, n - 1, 0, min, max),
      Math.max(...arr.slice(min, max + 1))
    );
    console.log("出错了");
  }
}
export {};
