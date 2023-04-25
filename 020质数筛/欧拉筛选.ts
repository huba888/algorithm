// 欧拉筛 每个合数都只被他的最小质因素筛掉,并且只被晒一次

let n = 1000;
let flag = new Array(n + 1).fill(false);
// 已经找到的质数
let prime: number[] = [];
for (let i = 2; i <= n; i++) {
  if (!flag[i]) prime.push(i);
  for (let j = 0; j < prime.length && i * prime[j] < n + 1; j++) {
    flag[prime[j] * i] = true;
    // 最关键的一步 如果当前的质数 是 i 的因子 就直接退出循环
    if (i % prime[j] == 0) break;
  }
}

console.log(prime.length);
console.log(flag.length);
export {};
