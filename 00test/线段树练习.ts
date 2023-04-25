let arr = [1, 2, 3, 4, 5, 6, 7, 8];
// 单点修改 区间查询
let n = arr.length;
let tree = new Array(n).fill(0);
function lowbit(x: number) {
  return x & -x;
}
function add(x: number, val: number) {
  for (let i = x; i <= n; i += lowbit(i)) {
    tree[i] += val;
  }
}
// 查询从1,到x 的和
function query(x: number) {
  let res = 0;
  for (let i = x; i > 0; i -= lowbit(i)) {
    res = res + tree[i];
  }
  return res;
}
for (let i = 0; i < arr.length; i++) {
  // 建立线段树
  add(i + 1, arr[i]);
}
// 查询原数组0-4的和
console.log(query(5));
// 修改原数组0上的值 加2
add(1, 2);
console.log(query(5));
export {};
