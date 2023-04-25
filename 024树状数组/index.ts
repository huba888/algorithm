// Binary Indexed Tress BIT
// 树状数组要从0开始
//
let a = [1, 2, 3, 4, 5];

let n = a.length;
// 必须不用0
let c = new Array(n + 1).fill(0);

// c[i] 的区间长度
function lowbit(i: number) {
  // (~i + 1)
  return -i & i;
}
// 修改单点值 arr[i] += val
function add(i: number, val: number) {
  for (; i <= n; i += lowbit(i)) {
    c[i] += val;
  }
}
// 求前缀和 a[1] ... a[i] 的和
function sum(i: number) {
  let sum = 0;
  for (; i > 0; i -= lowbit(i)) {
    // 累加所有的前驱
    sum += c[i];
  }
  return sum;
}
// a[i] + .... a[j]
// i必须大于等于1
function range(i: number, j: number) {
  return sum(j) - sum(i - 1);
}
for (let i = 0; i < a.length; i++) {
  add(i + 1, a[i]);
}
console.log(c);
// 0 , 1
// 其实是求0-3
// 必须都加1
console.log(range(1, 4));
export {};
