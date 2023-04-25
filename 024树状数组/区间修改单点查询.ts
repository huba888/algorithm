// 给一个数组
let arr = [1, 2, 3, 4, 5, 6, 7, 8];
// 给一个opration
// 将1,4加5,查2
let opration = [
  [1, 4, 5, 2],
  [2, 3, 5, 2],
  [4, 6, 2, 5],
];
// [6, 12, 13, 11, 7, 6, 7, 8];
function lowbit(x: number) {
  return x & -x;
}
function add(k: number, val: number) {
  for (let i = k; i <= n; i += lowbit(i)) {
    tree[i] += val;
  }
}
function query(k: number) {
  let res = 0;
  for (let i = k; i; i -= lowbit(i)) {
    res += tree[i];
  }
  return res;
}
let n = arr.length;
let tree = new Array(n + 2).fill(0);
// 维护差分数组
let prev = 0;
for (let i = 1; i <= n; i++) {
  add(i, arr[i - 1] - prev);
  prev = arr[i - 1];
}
// 开始操作
for (let i = 0; i < opration.length; i++) {
  let [l, r, val, k] = opration[i];
  add(l, val);
  add(r + 1, -val);
  console.log(query(k));
}

export {};
