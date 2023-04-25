// ST表采用了倍增的思想,在nlogn时间构造一个二维表(Sparse Table)
// RMQ 可以有效的用ST表来解决 (Range Minimum / Maximum Query) 问题
// 静态的查询区间最值问题,如果需要单点修改或者区间修改可以使用线段树
// st[i][j] 表示以i为起点 2**j 为长度的区间的最值 i , i + 2 ** j - 1
// 如何查表 x = Math.floor(log2(r - l + 1))
// max = Math.max(st[l,x],st[r - 2 ** x + 1][x])
// 如何建表? 2 ** j次方长度分为2半 2 ** j - 1 和 2 ** j - 1
// st[i][j] = Math.max(st[i][j - 1],st[i + 2 ** j - 1][j - 1])

let arr = [
  1, 2, 3, 4, 5, 6, 7, 7, 2, 8, 1, 2, 4, 5, 2, 4, 5, 151, 56, 12, 61, 236, 12,
];
let n = arr.length;

// 向下取整就可以了
let k = Math.floor(Math.log2(n));

let st = new Array(n).fill(0).map((_) => new Array(k).fill(0));
// 预处理
for (let i = 0; i < n; i++) {
  st[i][0] = arr[i];
}
for (let j = 1; j <= k; j++) {
  // i 的最大值是 n - 区间成都 + 1 而且是取不到的
  // 应为后面就取不到了 2 ** j 个数了
  for (let i = 0; i < n - (1 << j) + 1; i++) {
    st[i][j] = Math.max(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
  }
}
console.log(st);
let l = 17;
let r = 18;
let x = Math.floor(Math.log(r - l + 1));
console.log(Math.max(st[l][x], st[r - (1 << x) + 1][x]));
