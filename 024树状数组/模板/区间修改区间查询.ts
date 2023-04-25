let arr = [1, 2, 3, 4, 5, 6, 7, 8];
function lowbit(x: number) {
  return x & -x;
}
let n = arr.length;
let tree1 = new Array(n + 1).fill(0);
let tree2 = new Array(n + 1).fill(0);
function add(x: number, val: number) {
  for (let i = x; i <= n; i += lowbit(i)) {
    tree1[i] += val;
    tree2[i] += x * val;
  }
}
function query(x: number) {
  let res = 0;
  for (let i = x; i > 0; i -= lowbit(i)) {
    res += (x + 1) * tree1[i] - tree2[i];
  }
  return res;
}
let opration = [
  [1, 2, 3],
  //   [0, 5, 6],
];
let pre = 0;
for (let i = 0; i < arr.length; i++) {
  add(i + 1, arr[i] - pre);
  pre = arr[i];
}
// 查询原数组前3项的和
console.log(query(4));
// 对数组的区间进行修改
for (let i = 0; i < opration.length; i++) {
  let [l, r, val] = opration[i];
  // 为什么需要加1 和 加2?
  // 我们对原数组进行操作i 其实是对树状数组的i + 1 操作
  add(l + 1, val);
  add(r + 2, -val);
}
console.log(query(4));
// 查询
export {};
