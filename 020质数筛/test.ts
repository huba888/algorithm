function countPrimes(n: number): number {
  // 埃式筛
  let count = 0;
  let flag = new Array(n).fill(true);
  for (let i = 2; i < n; i++) {
    if (!flag[i]) continue;
    count++;
    for (let j = i * i; j < n; j += i) {
      flag[j] = false
    }
  }
  return count;
}
console.log(countPrimes(10));
