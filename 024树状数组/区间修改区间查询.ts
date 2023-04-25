// 我们需要维护两个树状数组

let arr = [1, 2, 3, 4, 5, 6, 7, 8];
let n = arr.length;
let tree1 = new Array(n + 2).fill(0);
let tree2 = new Array(n + 2).fill(0);
function lowbit(x: number) {
  return x & -x;
}
function add(x: number, val: number) {
  for (let i = x; i <= n; i += lowbit(i)) {
    tree1[i] += val;
    tree2[i] += val * x;
  }
}
function query(x: number) {
  let res = 0;
  for (let i = x; i > 0; i -= lowbit(i)) {
    res += (x + 1) * tree1[i] - tree2[i];
  }
  return res;
}
// 区间1,2 都加3
let option = [[1, 2, 3]];

let prev = 0;
for (let i = 0; i < arr.length; i++) {
  // 维护的是差分
  add(i + 1, arr[i] - prev);
  prev = arr[i];
}
console.log(
  query(8),
  arr.reduce((a, b) => a + b, 0)
);
console.log(query(3));
for (let i = 0; i < option.length; i++) {
  let [l, r, val] = option[i];
  add(l, val);
  add(r + 1, -val);
}
console.log(query(3));
// 求3到4的和
console.log(query(4) - query(2));
