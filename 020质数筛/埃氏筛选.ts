// 埃氏筛 筛除所有质数的倍数
// 求 1 到 n的所有质数
// 求 1000 以内的所有质数
// flag[3] = true 表示 x 是质数
let n = 1000;
let flag = new Array(n + 1).fill(false);
for (let i = 2; i <= n; i++) {
  // 如果不是质数,就直接跳过
  if (flag[i]) continue;
  // j 代表是几倍 j = 2 就是两倍....
  for (let j = 2; j * i <= n; j++) {
    flag[j * i] = true;
  }
}
const res = flag.map((v, i) => (v == false ? i : -1)).filter((i) => i != -1);
console.log(res);
export {};
