let arr = [1, 2, 3, 4, 5, 6, 7, 8];
// 0,7
// 注意我们是要对原数组进行操作
// 对原数组的[L,R]增加val
let opration = [
  [1, 2, 3],
  [0, 5, 6],
];
// 1 a[0] // 2 1 - 0
// n n - 1 - (n - 2)
let n = arr.length;
// 这里的tree 维护的是一个差分
let tree = new Array(n + 1).fill(0);
function lowbit(x: number) {
  return x & -x;
}
function add(x: number, val: number) {
  for (let i = x; i <= n; i += lowbit(i)) {
    tree[i] += val;
  }
}
function query(x: number) {
  let res = 0;
  for (let i = x; i > 0; i -= lowbit(i)) {
    res += tree[i];
  }
  return res;
}
let prev = 0;
for (let i = 0; i < arr.length; i++) {
  add(i + 1, arr[i] - prev);
  prev = arr[i];
}
// 求原数组第i个值  query(i + 1)
// 求元素组第3个值
console.log(query(4));
// 进行操作
for (const [l, r, val] of opration) {
  // 对原数组的l,r加val
  add(l + 1, val);
  add(r + 2, -val);
}
console.log(query(2));
export {};
