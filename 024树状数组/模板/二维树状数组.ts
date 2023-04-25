let arr = [
  [1, 2, 3], // 6
  [4, 5, 6], // 15
  [7, 8, 9], // 24
];
let m = arr.length;
let n = arr[0].length;
let tree = new Array(m + 1).fill(0).map((_) => new Array(n + 1).fill(0));
function lowbit(x: number) {
  return x & -x;
}
function add(x: number, y: number, val: number) {
  for (let i = x; i <= m; i += lowbit(i)) {
    for (let j = y; j <= n; j += lowbit(j)) {
      tree[i][j] += val;
    }
  }
}
function query(x: number, y: number) {
  let res = 0;
  for (let i = x; i > 0; i -= lowbit(i)) {
    for (let j = y; j > 0; j -= lowbit(j)) {
      res += tree[i][j];
    }
  }
  return res;
}
// 建立数结构
for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    add(i + 1, j + 1, arr[i][j]);
  }
}
console.log(tree);
// 查询原数组 2,2 的和
console.log(query(3, 3));
// 查询1,1 到 2,2的和
// 22 - 12 - 21 + 00
// 2,2 - 0,2 - 2,0 + 0 0
console.log(query(1, 1));
console.log(query(3, 3) - query(1, 3) - query(3, 1) + query(1, 1));
export {};
